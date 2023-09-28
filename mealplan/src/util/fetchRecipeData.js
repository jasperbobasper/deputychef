import { db, auth } from "../firebase";
import fetchRecipe from "./fetchRecipe";
import { collection, query, where, getDocs } from "firebase/firestore";
import initNutritionalInfo from './initNutritionalInfo';

const addToTags = (tags, item) => {
    if (item) {
        if (Array.isArray(item)) {
            tags.push(...item);
        } else {
            tags.push(item);
        }
    }
} 


const fetchRecipeData = async (recipeURL) => {
    const recipeCollection = collection(db, "users", auth.currentUser.uid, "recipes");
    const q = query(recipeCollection, where("originalURL", "==", recipeURL));
    const snap = await getDocs(q);
    if (!snap.empty) {
        throw new Error("Recipe already exists!");
    }
    let recipeJSON;
    try {
        recipeJSON = await fetchRecipe(recipeURL);
    } catch (error) {
        console.log(error);
    }

    const tags = [];
    addToTags(tags, recipeJSON.recipe?.recipeDiet);
    addToTags(tags, recipeJSON.recipe?.recipeCuisine);
    addToTags(tags, recipeJSON.recipe?.recipeCategory);
    const nutritionData = initNutritionalInfo(recipeJSON.recipe);
    const recipeData = {
        title: (recipeJSON.recipe?.name || ""),
        description: (recipeJSON.recipe?.description || ""),
        tags: tags,
        cookTime: (recipeJSON.recipe?.cookTime || ""),
        prepTime: (recipeJSON.recipe?.prepTime || ""),
        totalTime: (recipeJSON.recipe?.totalTime || ""),
        originalIngredientList: (recipeJSON.recipe?.recipeIngredients || []),
        servings: (recipeJSON.recipe?.recipeYield || ""),
        instructions: (recipeJSON.recipe?.recipeInstructions ||""),
        image: (recipeJSON.recipe?.image ||""),
        nutrition: nutritionData,
        originalURL: recipeURL,
        recipeCollection: "None",
    }
    return recipeData;
}

export default fetchRecipeData;