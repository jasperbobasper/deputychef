import React from 'react';
import Slideshow from '../components/Slideshow';
import ForgotPassword from '../components/ForgotPassword';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SignIn from '../components/SignIn';
import PageNotFound from './PageNotFound';
import { useParams } from 'react-router-dom';
import SignUp from '../components/SignUp';
import LandingPage from '../components/LandingPage';

export default function SignInPage() {
  const page = useParams();

  return (
    <Container disableGutters component="main" maxWidth="100%" sx={{ display: "flex", 
    flexDirection: "row", overflow: "hidden", alignContent: "right"}}>
      <Slideshow disabled={page.page ? false : true}/>
      <Container 
        maxWidth="lg" 
        sx={{
        mt: page.page? "110px" : "0px", 
        ml: page.page? "50%" : "40%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "right",}}>
          <Box
            sx={{
            marginTop: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 8,}}>
              {!page.page ? <LandingPage /> :
              (page.page === "forgot-password" ? <ForgotPassword /> :
              (page.page === "signin" ? <SignIn /> : 
              (page.page === "signup" ? <SignUp /> : <PageNotFound />)))}
          </Box>
        </Container>
      </Container>
  );
}