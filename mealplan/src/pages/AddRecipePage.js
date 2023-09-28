import React, {useState} from "react";
import RecipeURL from "../components/RecipeURL";
import EditRecipePage from "./EditRecipePage";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FontButton from "../components/FontButton";

const emptyRecipeData = {
    title: "",
    description: "",
    diet: "",
    cuisine: "",
    category: "",
    cookTime: "",
    prepTime: "",
    totalTime: "",
    originalIngredientList: [],
    servings: "",
    instructions: "",
    image: "",
    nutrition: [{ingredient: "calories", quantity: null, symbol: null, unit: null, unitPlural: null,}, 
    {ingredient: "fat", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",}, 
    {ingredient: "saturated fat", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",},
    {ingredient: "cholesterol", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",}, 
    {ingredient: "sodium", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",},
    {ingredient: "carbohydrates", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",},
    {ingredient: "fiber", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",},
    {ingredient: "sugar", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",}, 
    {ingredient: "protein", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",}],
    recipeCollection: "None",
}


const AddRecipePage = (props) => {
    const [recipeData, setRecipeData] = useState();

    if (!recipeData) {
        return (
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={1} direction="column" align="center">
                  <Grid item xs={12}>
                    <FontButton 
                      onClick={() => setRecipeData(emptyRecipeData)}
                      font="wildwest"
                      size="15px"
                      bgcolor="primary.main"
                      color="white.main"
                      variant="contained"
                      >
                      Create New Recipe!
                    </FontButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography> <b>or</b></Typography> 
                  </Grid>
                  <Grid item xs={12}>
                    <RecipeURL setRecipeData={setRecipeData}/> 
                  </Grid>
                </Grid>
              </Box>
            </Box>
        )
    } else {
        return (
            <EditRecipePage 
              recipes={props.recipes} 
              setrecipes={props.recipeProps} 
              recipeProps={recipeData}/>
        )
    }
}

export default AddRecipePage;

