import { doc, updateDoc } from 'firebase/firestore';
import convertMeasurementsMetric, { convertMeasurementsImperial } from './convertMeasurements';
import { db } from '../firebase';

const updateRecipeList = async (userID, recipeID, newIngredientList) => {
    const recipeRef = doc(db, "users", userID, "recipes", recipeID);

    try {
        await updateDoc(recipeRef, {
            ingredientList: newIngredientList,
        })
    } catch (e) {
        console.log(e);
    }
}

const convertAllRecipes = (userID, unit, recipes) => {
    const newRecipes = recipes;

    newRecipes.forEach(recipe => {
        const newIngredientList = [];
        recipe.data.ingredientList.forEach(ingredient => {
            let converted;
            if (unit === "metric") {
                converted = convertMeasurementsMetric(ingredient);
            } else {
                converted = convertMeasurementsImperial(ingredient);
            }
            newIngredientList.push(converted);
        })
        updateRecipeList(userID, recipe.id, newIngredientList)
        .catch(e => console.log(e));
    });
}

export default convertAllRecipes;