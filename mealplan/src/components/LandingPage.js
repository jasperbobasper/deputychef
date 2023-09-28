import React, { useEffect, useState } from "react";
import cowboy from "../assets/cowboy.png";
import { Typography, Button, IconButton} from "@mui/material";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import FontText from "./FontText";
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';


const intros = ["I'm the Deputy Chef 'round these parts, and I reckon it's high time I  tell y'all about our rootin' tootin' meal-planner",
"Wrangle your favorite recipes anywhere in the WWW (Wild, Wild Web) or enter them manually. We'll keep them safe and sound for you.",
" Generate a plan that reuses ingredients, makin' mighty sure that you use up all the groceries you buy. Cook a little extra so you can enjoy leftovers for lunch.",
"Just let me do the thinkin' so you can save time, money and energy while getting the most out of your ingredients and reducin' that pesky food waste.",
"We're mindful of those wantin' to steer clear of all them fancy nutritional numbers.",
"Remember, it's not just a meal plan- it's a culinary adventure in the wild west of flavor. "];

const delay = 6000;

const LandingPage = () => {
    const navigate= useNavigate();
    const [index, setIndex] = useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => 
            setIndex((prevIndex) => 
                prevIndex === intros.length - 1 ? 0 : prevIndex + 1
            ),
            delay
        );
        return () => {
            resetTimeout();
        };
    }, [index]);

    return(
        <Box>
            <Box sx={{p: 2, bgcolor: "background.main", borderRadius: 5}}>
            <Typography variant="smokum" component="h1" fontSize="70px" className="smokum">
                Howdy there, partner!
            </Typography>
            <Box sx={{height: 100, mt: 3, m: 2}}>
                <Typography variant="h5">
                    {intros[index]}
                </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                <MobileStepper
                    variant="dots"
                    steps={6}
                    position="static"
                    activeStep={index}
                    sx={{ maxWidth: 400, flexGrow: 1, bgcolor: "background.main" }}
                    nextButton={
                        <IconButton size="small" onClick={() => setIndex((prevIndex) => 
                            prevIndex === intros.length - 1 ? 0 : prevIndex + 1
                        )}>
                            <KeyboardArrowLeft />
                        </IconButton>
                    }
                    backButton={
                        <IconButton size="small" onClick={() => setIndex((prevIndex) => 
                            prevIndex === 0 ? intros.length - 1 : prevIndex - 1
                        )}>
                            <KeyboardArrowRight />
                        </IconButton>
                    }
                    />
                    </Box>
            </Box>
            <Box sx={{mt: "5%", display: 'flex', flexDirection: 'column', width: "65%"}}>
                    <FontText font="smokum" size="40px" sx={{pl: 2}}>
                        <b>Giddy up and let's get cookin'!</b>
                    </FontText>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", mt: 1}}>
                        <Button size="large" onClick={() => navigate("/signup")}>
                            Sign Up
                        </Button>
                        <Button size="large" onClick={() => navigate("/signin")}>
                            Sign In
                        </Button>
                </Box>
            </Box>
            <img src={cowboy} style={{zIndex: 2, position: "absolute", right: "5%", bottom: "10%", width: "25%"}}/>
        </Box>
    );

}

export default LandingPage;