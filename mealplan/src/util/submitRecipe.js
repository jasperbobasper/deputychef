import { doc, setDoc, serverTimestamp, updateDoc, } from "firebase/firestore";
import fetchIngredients from "./fetchIngredients";
import trimIngredientModifiers from "./trimIngredientModifiers";
import { db } from "../firebase";

export default async function submitRecipe(recipeData, user, recID) {
    let ingredientList;
    try {
    const ingredients = recipeData.originalIngredientList;

    if (Array.isArray(ingredients)) {
        ingredientList = await fetchIngredients(user.settings.units, ingredients);
    } else {
        console.error('recipeIngredients is not an array:', ingredients);
    }
    } catch (error) {
    console.log(error);
    }
     
    const ingredientNames = [];
    ingredientList.forEach((ingredient) => {
        let trimmedIngredient = trimIngredientModifiers(ingredient.ingredient);
        ingredientNames.push(trimmedIngredient);
      });

    console.log(ingredientNames);
    const updateRecipe = {
        ...recipeData,
        ingredients: ingredientNames,
        ingredientList: ingredientList,
        dateAdded: serverTimestamp(),
    }
    console.log(updateRecipe);
    console.log(recID);
    const recipeRef = doc(db, "users", user.uid, "recipes", recID);
    const tags = [];
    const userRecipeTags = user?.recipeTags;
    if (Array.isArray(userRecipeTags)) {
        tags.push(...userRecipeTags);
    } else {
        if (userRecipeTags) {
            tags.push(userRecipeTags);
        }
    }

    const recipeTags = recipeData?.tags;
    if (Array.isArray(recipeTags)) {
        recipeTags.forEach((tag) => {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        })
    } else {
        if (recipeTags) {
            if (!tags.includes(recipeTags)) {
                tags.push(recipeTags);
            }
        }
    }

    try {
        await setDoc(recipeRef, updateRecipe);
        const userRef = doc(db, "users", user.uid);
        if (tags !== user?.recipeTags) {
            await updateDoc(userRef, {
                recipeTags: tags,
            })
        }
        return (updateRecipe);
    } catch (error) {
        console.log(error);
        return;
    }
}