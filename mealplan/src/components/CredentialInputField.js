import { TextField } from "@mui/material"


const CredentialInputField = ({name, label, autoComplete, setField}) => {
    return(
      <TextField
        margin="normal"
        required
        fullWidth
        id={name}
        label={label}
        name={name}
        type={name}
        autoComplete={autoComplete}
        variant= "filled"
        autoFocus
        onChange={(e) => setField(e.target.value)}
        sx={{bgcolor: "background.main", borderRadius: 1}}
        />
    )
  }

export default CredentialInputField;