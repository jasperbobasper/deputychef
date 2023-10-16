import { Container, IconButton, Typography, Box, FormControlLabel, Checkbox, Select, MenuItem } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import cowboy from "../assets/cowboy.png";
import CredentialInputField from "./CredentialInputField";
import FontButton from "./FontButton";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const MiniForm = ({children, increment}) => {
    return (
        <Box component="form" onSubmit={() => increment(1)}>
            {children}
            <Box sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                <IconButton size="large" onClick={() => increment(-1)}>
                    <NavigateBeforeIcon/>
                </IconButton>
                <IconButton size="large" type="submit">
                    <NavigateNextIcon/>
                </IconButton>
            </Box>
        </Box>
    )
}

const FirstLogin = ({user, setUser}) => {
    const [index, setIndex] = useState(0);
    const [userName, setUserName] = useState("");
    const [settings, setSettings] = useState(user.settings);

    const increment = (value) => {
        setIndex(index + value);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({...settings, [name]: value})
    }

    const handleSubmit = async () => {
        try {
            const update = {
                name: userName,
                settings: settings,
                firstLogin: false,
            }
            await updateDoc(doc(db, "users", user.uid), update);
            setUser({
                ...user,
                update,
            })
            window.location.reload(false);
        } catch (error) {
            alert(error);
        }
    };

    const userInfoScript = [
        "Howdy there, partner! I'm your trusty Deputy Chef, here to help you wrangle up some delicious meals while reducing food waste. But first, let's get to know each other better.",
        "Before we start, what's your name, friend?",
        `Well, ${userName}, it's a pleasure to meet ya! Now, let's set up a few things to make your Deputy Chef experience just right.`,
        "Would you prefer to use the metric system or the imperial system for measurements?",
        `Got it, ${userName}! Would you like to see nutritional values for your recipes or keep those bad boys hidden?`,
        `No problem, ${userName}. Now let's get cookin', I'm starved!`,
    ];

    return (
        <Container sx={{mt: 10, width: "100%"}}>
            <Box sx={{ position: "absolute", right: "10%", top: "30%", width: "30%", height: "auto"}}>
                <img src={cowboy} alt="The deputy chef on his horse" style={{width: "100%", height: "auto"}}/>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", p: 2, borderRadius: 3, bgcolor: "background.main", width: "60%", justifyContent: "center"}}>
                <Typography variant="h6">{userInfoScript[index]}</Typography>
                {index === 1 && 
                    <MiniForm increment={increment}>
                        <CredentialInputField 
                            name="name"
                            label="Name or Nickname"
                            autoComplete="given-name"
                            setField={setUserName}
                            />
                    </MiniForm>}
                {index === 4 && 
                    <MiniForm increment={increment}>
                        <FormControlLabel
                            control={<Checkbox value="hideCalories" sx={{color: "white", '&.Mui-checked': {color: "white",},}} />}
                            label="Hide Calorie Amounts"
                            name="hideCalories"
                            checked={settings?.hideCalories}
                            onChange={() => setSettings({...settings, hideCalories: !settings.hideCalories})}
                        />
                        <FormControlLabel
                            control={<Checkbox value="hideNutrition" sx={{color: "white", '&.Mui-checked': {color: "white",},}} />}
                            label="Hide all Nutritional Values"
                            name="hideNutrition"
                            checked={settings?.hideNutrition}
                            onChange={() => setSettings({...settings, hideNutrition: !settings.hideNutrition})}
                        />
                    </MiniForm>}
                    {index === 3 && 
                    <MiniForm increment={increment}>
                        <Select
                        sx={{bgcolor: "white"}}
                        labelId="units"
                        name="units"
                        value={settings?.units}
                        onChange={(e) => handleChange(e)}
                        >
                            <MenuItem value={"metric"}>{`Metric (ml, kg)`}</MenuItem>
                            <MenuItem value={"imperial"}>{`Imperial (oz, lb)`}</MenuItem>
                        </Select>
                    </MiniForm>}
                    {(index === 0 || index === 2 || index === userInfoScript.length - 1) && 
                    <Box sx={{width: "100%", display: "flex", justifyContent: index === 0 ? "flex-end" : "space-between"}}>
                        {index !== 0 && 
                            <IconButton size="large" type="submit" onClick={() => increment(-1)}>
                                < NavigateBeforeIcon/>
                            </IconButton>
                        }
                        {index === userInfoScript.length - 1 ?
                            <FontButton
                                onClick={handleSubmit}
                                type="submit"
                                font="wildwest"
                                size="40px">
                                Yee haw!
                            </FontButton> : 
                        <IconButton size="large" type="submit" onClick={() => increment(1)}>
                            <NavigateNextIcon/>
                        </IconButton>}
                    </Box>}
            </Box>
            
        </Container>
    );
}

export default FirstLogin;