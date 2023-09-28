import { parse } from 'recipe-ingredient-parser-v3';

const initNutritionalInfo = (recipe) => {
    const nutritionList = [];

    nutritionList.push(recipe?.nutritionCalories ? 
        parse(recipe.nutritionCalories, 'eng') : 
        {ingredient: "calories", quantity: null, symbol: null, unit: null, unitPlural: null,});
    nutritionList.push(recipe?.nutritionFatContent ?
        parse(recipe.nutritionFatContent, 'eng') :
        {ingredient: "fat", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",});
    nutritionList.push(recipe?.nutritionSaturatedFatContent ? 
        parse(recipe.nutritionSaturatedFatContent, 'eng') :
        {ingredient: "saturated fat", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",});
    nutritionList.push(recipe?.nutritionCholesterolContent ? 
        parse(recipe.nutritionCholesterolContent, 'eng') :
        {ingredient: "cholesterol", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",});
    nutritionList.push(recipe?.nutritionSodiumContent ? 
        parse(recipe.nutritionSodiumContent, 'eng') :
        {ingredient: "sodium", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",});
    nutritionList.push(recipe?.nutritionCarbohydrateContent ? 
        parse(recipe.nutritionCarbohydrateContent, 'eng') :
        {ingredient: "carbohydrates", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",});
    nutritionList.push(recipe?.nutritionFiberContent ? 
        parse(recipe.nutritionFiberContent, 'eng') :
        {ingredient: "fiber", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",});
    nutritionList.push(recipe?.nutritionSugarContent ? 
        parse(recipe.nutritionSugarContent, 'eng') :
        {ingredient: "sugar", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",});
    nutritionList.push(recipe?.nutritionProteinContent ? 
        parse(recipe.nutritionProteinContent, 'eng') :
        {ingredient: "protein", quantity: null, symbol: "g", unit: "gram", unitPlural: "grams",});

    return nutritionList;
};

export default initNutritionalInfo;