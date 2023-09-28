import { Grid, Typography } from "@mui/material";
import RecipeSelect from "./RecipeSelect";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React, { useEffect } from 'react';
import MealPlanRecipeCard from "./MealPlanRecipeCard";
import generateMealPlan from "../util/generateMealPlan";

const MealPlanEdit = ({size, meal, mealArray, recipe, userCollections, setMealArray}) => {

    const selectStyles = {
        boxShadow: 1,
        mb: 2, 
        bgcolor: "white",
        border: 0
    };
    
    const addField = () => {
        const newField = [...mealArray, 
            {recipeID: "",
            servings: ""}
        ];
        setMealArray(newField);
    }

    const handleServings = (value, index) => {
        const newField = [...mealArray];
        newField[index].servings = value;
        setMealArray(newField);
    }

    const setField = (value, index) => {
        const newField = [...mealArray];
        newField[index].recipeID = value;
        const rec = recipe.find((obj) => obj.id === value)
        newField[index].servings = rec.servings;
        setMealArray(newField);
    }


    return (
        <div>
            <Typography variant="h6">{meal}</Typography>
                {Array.isArray(mealArray) && mealArray?.length > 0 && mealArray?.map((mealItem, index) => (
                    <Grid container key={index}>
                        <Grid item xs={11}>
                        {mealItem.recipeID === "" ?
                        (<RecipeSelect recipeNames={
                            recipe?.map((recipe) => 
                            ({name: recipe.data.title,
                            id: recipe.id, 
                            collection: recipe.data.recipeCollection}))} 
                            index={index}
                            selection={mealArray[index].recipeID} 
                            setSelection={setField} 
                            userCollections={userCollections}
                            sx={selectStyles}/>) :
                            <MealPlanRecipeCard
                                size={size} 
                                recipe={recipe.find((obj) => obj.id === mealItem.recipeID)} 
                                index={index} servings={mealItem.servings} 
                                edit={true} handleServings={handleServings}/>}
                            </Grid>
                            <Grid item sx={{display: "flex", flexDirection: "reverse"}} xs={1}>
                            <IconButton sx={{color: "white"}} onClick={() => {
                                    const updatedList = [...mealArray];
                                    updatedList.splice(index, 1);
                                    setMealArray(updatedList);
                                }}>
                                    <DeleteIcon/>
                            </IconButton>
                            </Grid>
                    </Grid>
                ))}
                <Button 
                    sx={{mt: 1, mb: 2, color: "white", borderColor: "white"}} 
                    variant="outlined" 
                    onClick={addField}>
                        + Add Dish
                </Button>
        </div>
    )
}

export default MealPlanEdit;