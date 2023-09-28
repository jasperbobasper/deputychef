import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { db, auth } from '../firebase';
import { setDoc, doc, serverTimestamp, arrayUnion } from "firebase/firestore"; 
import newMealPlan from '../util/newMealPlan';
import CredentialInputField from './CredentialInputField';
import FontText from './FontText';


 
const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const handleSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), {
              createdOn: serverTimestamp(),
              recipeCollections: arrayUnion("None"),
              settings: {
                hideCalories: false, 
                hideNutrition: false, 
                units: "metric",
              },
              firstLogin: true,
            })
            .catch((error) => {
              alert(error);
            })
            newMealPlan()
            .catch((error) => alert(error));
            navigate("/signin")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
        });
    }
 
  return (
    <div>
        <FontText 
        size="80px" 
        font="smokum" 
        color="background.main">
            SIGN UP
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
                Sign Up
            </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" color="secondary.main" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        </div>
  )
}
 
export default SignUp;