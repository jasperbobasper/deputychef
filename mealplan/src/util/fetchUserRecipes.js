import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function fetchUserRecipes(userID) {
    const userRecipes = collection(db, "users", userID, "recipes");
    const recipes = [];
    
    try {
        const recipeSnaps = await getDocs(userRecipes);
        recipeSnaps.forEach((recipe) => {
            recipes.push({id: recipe.id, data: recipe.data()})
        })
        return (recipes);
    } catch (e) {
        console.log(e);
    }
}
