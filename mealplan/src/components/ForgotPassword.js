import { sendPasswordResetEmail } from "firebase/auth";
import CredentialInputField from "./CredentialInputField";
import { auth } from "../firebase";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from "react";
import { Link } from "@mui/material";

const ForgotPassword = () => {
    const [email, setEmail] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        sendPasswordResetEmail(auth, email);
        setSuccess(true);
      } catch (e) {
        alert(e);
      }
      setEmail(null);
    }

    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Link href="/signin" color="secondary.main" variant="body2">
                {`< Back to Sign In`}
        </Link>
        <CredentialInputField
          label="Email Address"
          name="email"
          setField={setEmail}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Password Reset Link
        </Button>
        {success && 
        <Alert severity="success">
          <AlertTitle>Email Sent!</AlertTitle>
          Follow the link in your email to reset password!
        </Alert>}
      </Box>
    )

}

export default ForgotPassword;