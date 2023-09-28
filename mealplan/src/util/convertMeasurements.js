
const convertMeasurementsImperial = (ingredient) => {
    var convert = require('convert-units');
    var newAmt = ingredient.quantity;
    if (!ingredient.unit){
        return ingredient;
    }
    if (ingredient.unit === "gram" || ingredient.unit === "kilogram") {
        if (ingredient.unit === "kilogram" || ingredient.quantity > 453.592) {
            newAmt = ingredient.unit === "gram" ? 
                convert(ingredient.quantity).from('g').to('lb') :
                convert(ingredient.quantity).from('kg').to('lb');
            ingredient.unit = "pound";
            ingredient.unitPlural = "pounds";
            ingredient.symbol = "lb";
        } else {
            newAmt = convert(ingredient.quantity).from('g').to('oz');
            ingredient.unit = "ounce";
            ingredient.unitPlural = "ounces";
            ingredient.symbol = "oz";
        }
    } else if (ingredient.unit === "mililitre" || 
                ingredient.unit === "litre") {
        newAmt = ingredient.unit === "mililitre" ?
            convert(ingredient.quantity).from('ml').to('cup') :
            convert(ingredient.quantity).from('l').to('cup');
        ingredient.unit = "cup";
        ingredient.unitPlural = "cups";
        ingredient.symbol = "cup";
    } 
    if (newAmt === 0) {
        newAmt = 1;}
    if (Math.round(newAmt * 2) / 2 === 0 && newAmt !== 0 && newAmt > 0) {
        ingredient.quantity = 0.5;
    } else {
        ingredient.quantity = Math.round(newAmt * 2) / 2;
    }
    return ingredient;
}

const convertMeasurementsMetric = (ingredient) => {
    var convert = require('convert-units');
    var newAmt = ingredient.quantity;
    if (!ingredient.unit){
        return ingredient;
    }
    if (ingredient.unit === "ounce") {
        newAmt = convert(ingredient.quantity).from('oz').to('g');
        ingredient.unit = "gram";
        ingredient.unitPlural = "grams";
        ingredient.symbol = "g";
    } else if (ingredient.unit === "pound") {
        newAmt = convert(ingredient.quantity).from('lb').to('kg');
        ingredient.unit = "kilogram";
        ingredient.unitPlural = "kilograms";
        ingredient.symbol = "kg";
    } else if (ingredient.unit === "fluid ounce") {
        newAmt = convert(ingredient.quantity).from('fl-oz').to('ml');
        ingredient.unit = "mililitre";
        ingredient.unitPlural = "mililitres";
        ingredient.symbol = "ml";
    } else if (ingredient.unit === "pint" ||
                ingredient.unit === "quart" ||
                ingredient.unit === "gallon") {
        newAmt = ingredient.unit === "pint" ?
            convert(ingredient.quantity).from('pnt').to('l') :
            (ingredient.unit === "quart" ?
            convert(ingredient.quantity).from('qt').to('l') :
            convert(ingredient.quantity).from('gal').to('l'));
        ingredient.unit = "litre";
        ingredient.unitPlural = "litres";
        ingredient.symbol = "l";
    }
    if (newAmt === 0) {
        newAmt = 1};
    if (Math.round(newAmt * 2) / 2 === 0 && newAmt !== 0 && newAmt > 0) {
        ingredient.quantity = 0.5;
    } else {
        ingredient.quantity = Math.round(newAmt * 2) / 2;
    }
    return (ingredient);
}

export default convertMeasurementsMetric;
export {convertMeasurementsImperial};