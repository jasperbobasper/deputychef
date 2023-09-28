import React, { useContext, useEffect, useState } from "react";
import userContext from "../util/userContext";
import { db, auth } from "../firebase";
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl } from "@mui/material";
import { updateDoc, doc } from "firebase/firestore";
import { reauthenticateWithCredential, updatePassword, updateEmail, EmailAuthProvider} from "firebase/auth"; 
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ChangeCredentials from "../components/ChangeCredentials";
import AccordionContainer from "../components/AccordionContainer";
import convertAllRecipes from "../util/convertAllRecipes";

export default function SettingsPage(props) {
    const user = useContext(userContext);
    const [email, setEmail] = useState(auth.currentUser.email);
    const [settings, setSettings] = useState(user.settings);
    const [changePassword, setChangePassword] = useState(false);
    const [changeEmail, setChangeEmail] = useState(false);
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [changeNutrition, setChangeNutrition] = useState(false);
    const [changePreferences, setChangePreferences] = useState(false);

    const accordionStyle = {
      bgcolor: "info.main",
      color: "white.main",
    }

    useEffect(() => {
      setSettings(user.settings);
    }, [user]);

    const handleSubmit = async () => {
        if (changePassword || changeEmail) {
            try{
                let credential = EmailAuthProvider.credential(
                    auth.currentUser.email,
                    password,
                    auth.currentUser.uid
                );
                reauthenticateWithCredential(auth.currentUser, credential)
                if (changePassword) {
                  try {
                    updatePassword(auth.currentUser, newPassword)
                  } catch (e) {
                    alert(e);
                  }
                  setChangePassword(false);
                  setPassword(null);
                  setNewPassword(null);
                } else {
                  try {
                    updateEmail(auth.currentUser, email);
                  } catch (e) {
                    alert(e);
                  }
                  setChangeEmail(false);
                  setPassword(null);
                  setEmail(null);
                }
            } catch(e) {
                alert("Incorrect credentials!")
            }
        }
        if (settings !== user.settings) {
          if (settings.units !== user.settings.units) {
            try {
              convertAllRecipes(user.uid, settings.units, props.recipes);
            } catch (e) {
              alert(e);
            }
          }
          try {
              await updateDoc(doc(db, "users", user.uid), {
                settings: settings,
              });
              props.setUser({...user, settings: settings});
          } catch (e) {alert(e)}
          
        }  
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({...settings, [name]: value})
    }
    
    return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mt: 3}}>
          <Box sx={{ borderRadius: 1}}>
          <ChangeCredentials
            setEmail={setEmail}
            setPassword={setPassword}
            setNewPassword={setNewPassword}
            changeEmail={changeEmail}
            setChangeEmail={setChangeEmail}
            changePassword={changePassword}
            setChangePassword={setChangePassword}
            />
            <AccordionContainer
              id="changeNutrition"
              title="Nutrition Settings"
              expanded={changeNutrition}
              onChange={() => setChangeNutrition(!changeNutrition)}
              sx={accordionStyle}
              >
              <FormControlLabel
                control={<Checkbox value="hideCalories" sx={{color: "white.main", '&.Mui-checked': {color: "white.main",},}} />}
                label="Hide Calorie Amounts"
                name="hideCalories"
                checked={settings.hideCalories}
                sx={{color: "white.main"}}
                onChange={(e) => setSettings({...settings, hideCalories: !settings.hideCalories})}
              />
              <FormControlLabel
                control={<Checkbox value="hideNutrition" sx={{color: "white.main", '&.Mui-checked': {color: "white.main",},}} />}
                label="Hide all Nutritional Values"
                name="hideNutrition"
                checked={settings.hideNutrition}
                sx={{color: "white.main"}}
                onChange={(e) => setSettings({...settings, hideNutrition: !settings.hideNutrition})}
              />
            </AccordionContainer>
            <AccordionContainer
              id="preferences"
              title="Preferences"
              expanded={changePreferences}
              onChange={() => setChangePreferences(!changePreferences)}
              sx={accordionStyle}>
              <FormControl fullWidth>
              <Typography variant="subtitle2" sx={{ml: 1}}>Units:</Typography>
              <Select
                  sx={{bgcolor: "white.main"}}
                  labelId="units"
                  name="units"
                  value={settings.units}
                  onChange={(e) => handleChange(e)}
              >
                  <MenuItem value={"metric"}>{`Metric (ml, kg)`}</MenuItem>
                  <MenuItem value={"imperial"}>{`Imperial (oz, lb)`}</MenuItem>
              </Select>
              </FormControl>
            </AccordionContainer>
            </Box>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
      </Container>
    )
}