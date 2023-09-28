import { parse } from 'recipe-ingredient-parser-v3';
import convertMeasurementsMetric, { convertMeasurementsImperial } from './convertMeasurements';

const fetchIngredients = async (unit, ingredients) => {
    const ingredientList = [];
    ingredients.forEach((ingredient) => {
        let converted;
        if (unit === "metric") {
            converted = convertMeasurementsMetric(parse(ingredient, 'eng'));
        } else {
            converted = convertMeasurementsImperial(parse(ingredient, 'eng'));
        }
        ingredientList.push(converted)});
    return ingredientList;
};
 
export default fetchIngredients;