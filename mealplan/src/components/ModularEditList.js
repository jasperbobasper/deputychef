import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';


const ModularEditList = ({type, originalList, recipe, setRecipe}) => {
    const [list, setList] = useState(originalList);

    const label = type === "ingredients" ? "Ingredient" : "Step";
    const placeholder = type === "ingredients" ? "Eg. 1 cup flour..." : "Step";
    const title = type === "ingredients" ? "Ingredients" : "Method";

    const addField = () => {
        let newField;
        if (type === "ingredients") {
           newField = [...list, ""];
        } else {
            newField = [...list, 
            {
                text: "",
                type: "text",
            }];
        }
        setList(newField);
    }

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value !== "" && value.trim() !== "") {
            const updatedList = [...list];
            if (type === "ingredients") {
                updatedList[index] = value;
            } else {
                updatedList[index].text = value;
            }
            setList(updatedList);
            const updatedRecipe = {...recipe};
            if (type === "ingredients") {
                updatedRecipe.originalIngredientList = list;
            } else {
                updatedRecipe.instructions = list;
            }
            setRecipe(updatedRecipe);
        } 
    }

    return (
        <Grid item sx={{ml: 1, mt: 1}}>
            <Typography sx={{ml: 2}} variant="subtitle1"><b>{title}</b></Typography>
            <Grid container spacing={2}>
                {list && list.map((item, index) => (
                    <Grid item key={index} xs={12} >
                        <TextField
                        required
                        multiline
                        rows={type ==="ingredients" ? 1 : 4}
                        id={{label} + index}
                        name={{label} + "List"}
                        label={`${label} ${index + 1}`}
                        onChange={(e) => handleChange(e, index)}
                        sx={{width: "90%"}}
                        defaultValue={type === "method" ? 
                        (item.text !== "" ? item.text : undefined) : 
                        (item !== "" ? item : undefined)}
                        placeholder={type === "method" ? 
                            (item.text === "" ? placeholder : undefined) : 
                            (item === "" ? placeholder : undefined)}
                        />
                        <IconButton onClick={() => {
                            const updatedList = [...list];
                            updatedList.splice(index, 1);
                            setList(updatedList);
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
            <Button 
            sx={{mt: 2}} 
            variant="outlined" 
            onClick={addField}>
                {`+ Add ${label}`}
            </Button>
        </Grid>
    )
}

export default ModularEditList;