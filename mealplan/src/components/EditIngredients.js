import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';


const EditIngredients = ({originalIngredientList, setRecipe, recipe}) => {

    const [ingredientList, setIngredientList] = useState(originalIngredientList);

    const addIngredientField = () => {
        const newField = [...ingredientList, ""];
        setIngredientList(newField);
    }

    const handleIngredientChange = (e, index) => {
        const value = e.target.value;
        const updatedIngredientList = [...ingredientList];
        updatedIngredientList[index] = value;
        setIngredientList(updatedIngredientList);
        const updatedRecipe = {...recipe};
        updatedRecipe.originalIngredientList = ingredientList;
        setRecipe(updatedRecipe);
    }

    return (
        <Grid item sx={{ml: 1, mt: 1}}>
            <Typography sx={{ml: 2}} variant="subtitle1"><b>Ingredients:</b></Typography>
            <Grid container spacing={2}>
                {ingredientList && ingredientList.map((ingredient, index) => (
                    <Grid item key={index} xs={12} >
                        <TextField
                        required
                        id={"ingredient" + index}
                        name="originalIngredientsList"
                        onChange={(e) => handleIngredientChange(e, index)}
                        sx={{width: "90%"}}
                        defaultValue={ingredient}
                        placeholder={ingredient === "" ? "Eg. 1 cup flour..." : undefined}
                        />
                        <IconButton onClick={() => {
                            const updatedList = [...ingredientList];
                            updatedList.splice(index, 1);
                            setIngredientList(updatedList);
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
            <Button 
            sx={{mt: 2}} 
            variant="outlined" 
            onClick={addIngredientField}>
                + Add Ingredient
            </Button>
        </Grid>
    )
}

export default EditIngredients;