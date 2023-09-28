import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import CredentialInputField from '../components/CredentialInputField';
import FontText from '../components/FontText';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     
    const handleSubmit = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          //user is signed in
          navigate("/")
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // todo: specific error handling (e.g wrong password)
          alert(`${errorCode}: ${errorMessage}`);
      });
    }
  

    return (
        <div>
            <FontText 
            size="80px" 
            font="smokum" 
            color="background.main">
                SIGN IN
            </FontText>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <CredentialInputField
                label="Email Address"
                name="email"
                setField={setEmail}
            />
            <CredentialInputField
                id="password"
                label="Password"
                name="password"
                setField={setPassword}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ boxShadow: 0, mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="/forgot-password" color="secondary.main" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href="/signup" color="secondary.main" variant="body2">
                    New around these parts? Sign Up
                </Link>
                </Grid>
            </Grid>
            </Box>
        </div>
    )
}

export default SignIn;