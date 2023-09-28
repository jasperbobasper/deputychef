import * as React from 'react';
import TextField from '@mui/material/TextField';
import AccordionContainer from './AccordionContainer';

const ChangeCredentials = ({setEmail, setPassword, 
                        setNewPassword, changeEmail, 
                        setChangeEmail, changePassword, 
                        setChangePassword}) => {
    const accordionStyle = {
      bgcolor: "info.main",
      color: "white.main",
    }

    const handleChange = (change) => {
        if (change === "email") {
            setChangeEmail(!changeEmail);
            if (changePassword === true)
                setChangePassword(false);
        } else {
            setChangePassword(!changePassword);
            if (changeEmail === true)
                setChangeEmail(false);
        }
    }

    return (
        <div>
        <AccordionContainer 
            id="changeEmail" 
            title="Change Email" 
            expanded={changeEmail}
            onChange={() => handleChange("email")}
            sx={accordionStyle}>
            <TextField
                required
                fullWidth
                sx={{bgcolor: "white.main", borderRadius: 1}}
                id="email"
                label="New Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                fullWidth
                sx={{marginTop:1, bgcolor: "white.main", borderRadius: 1}}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
          </AccordionContainer>
          <AccordionContainer 
            id="changePassword" 
            title="Change Password" 
            expanded={changePassword}
            onChange={() => handleChange("password")}
            sx={accordionStyle}>
          <TextField
                required
                fullWidth
                sx={{bgcolor: "white.main", borderRadius: 1}}
                name="oldPassword"
                label="Old Password"
                type="password"
                id="oldPassword"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                required
                fullWidth
                sx={{marginTop:1, bgcolor: "white.main", borderRadius: 1}}
                name="password"
                label="Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
        </AccordionContainer>
        </div>
    )
}

export default ChangeCredentials;