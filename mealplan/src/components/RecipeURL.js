import React, {useState} from "react";
import fetchRecipeData from "../util/fetchRecipeData";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FontButton from "./FontButton";


const RecipeURL = ({setRecipeData}) => {
    const [url, setURL] = useState("");
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (open) {
            try {
                const data = await fetchRecipeData(url);
                setRecipeData(data);
            } catch (error) {
                alert(error);
            }
        } else {
            setOpen(true);
        }
      };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
             <Grid container spacing={2} align="center">
                <Grid item xs={12}>
                    <FontButton 
                      variant={open? "contained" : "outlined"}
                      font="wildwest"
                      size="15px"
                      bgcolorcolor={open? "primary.main" : "white.main"}
                      color={open? "white.main" : "primary.main"}
                      type="submit"
                     >
                        Get Recipe from URL!
                    </FontButton>
                  </Grid>
                  { open && <Grid item xs={12}>
                    <TextField
                        required
                        onChange={(e) => setURL(e.target.value)}
                        name="url"
                        label="url"
                        type="text"
                        value={url}
                        />
                  </Grid> }
            </Grid>
        </Box>  
    )
};

export default RecipeURL;