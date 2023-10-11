
const convertMeasurementsImperial = (ingredient) => {
    var convert = require('convert-units');
    var newAmt = ingredient.quantity;
    var minQty;
    var maxQty;
    if (!newAmt ||newAmt.isNaN()) {
        minQty = ingredient?.minQty;
        maxQty = ingredient?.maxQty;
    }
    if (!ingredient.unit){
        return ingredient;
    }
    if (ingredient.unit === "gram" || ingredient.unit === "kilogram") {
        if (ingredient.unit === "kilogram" || ingredient.quantity > 453.592) {
            if (!minQty) {
                newAmt = ingredient.unit === "gram" ? 
                convert(ingredient.quantity).from('g').to('lb') :
                convert(ingredient.quantity).from('kg').to('lb');
            } else {
                if (ingredient.unit === "gram") {
                    minQty = convert(ingredient.minQty).from('g').to('lb');
                    maxQty = convert(ingredient.maxQty).from('g').to('lb');
                } else {
                    minQty = convert(ingredient.minQty).from('kg').to('lb');
                    maxQty = convert(ingredient.maxQty).from('kg').to('lb');
                }
            }
            ingredient.unit = "pound";
            ingredient.unitPlural = "pounds";
            ingredient.symbol = "lb";
        } else {
            if (!minQty) {
                newAmt = convert(ingredient.quantity).from('g').to('oz');
            } else {
                minQty = convert(ingredient.minQty).from('g').to('oz');
                maxQty = convert(ingredient.maxQty).from('g').to('oz');
            }
            ingredient.unit = "ounce";
            ingredient.unitPlural = "ounces";
            ingredient.symbol = "oz";
        }
    } else if (ingredient.unit === "mililitre" || 
                ingredient.unit === "litre") {
        if (!minQty) {
            newAmt = ingredient.unit === "mililitre" ?
            convert(ingredient.quantity).from('ml').to('cup') :
            convert(ingredient.quantity).from('l').to('cup');
        } else {
            if (ingredient.unit === "mililitre") {
                minQty = convert(ingredient.minQty).from('ml').to('cup');
                maxQty = convert(ingredient.maxQty).from('ml').to('cup');
            } else {
                minQty = convert(ingredient.minQty).from('l').to('cup');
                maxQty = convert(ingredient.maxQty).from('l').to('cup');
            }
        }
        ingredient.unit = "cup";
        ingredient.unitPlural = "cups";
        ingredient.symbol = "cup";
    } 
    if (newAmt === 0) {
        newAmt = 1;}
    if (minQty && minQty === 0) {
        minQty = 1;
        maxQty = maxQty === 0 ? 1 : maxQty;
    }
    if (Math.round(newAmt * 2) / 2 === 0 && newAmt !== 0 && newAmt > 0) {
        ingredient.quantity = 0.5;
    } else {
        ingredient.quantity = Math.round(newAmt * 2) / 2;
    }
    if (minQty && Math.round(minQty * 2) / 2 === 0 && minQty !== 0 && minQty > 0) {
        ingredient.minQty = 0.5;
    } else {
        ingredient.minQty = Math.round(minQty * 2) / 2;
    }
    if (maxQty && Math.round(maxQty * 2) / 2 === 0 && maxQty !== 0 && maxQty > 0) {
        ingredient.maxQty = 0.5;
    } else {
        ingredient.maxQty = Math.round(maxQty * 2) / 2;
    }
    return ingredient;
}

const convertMeasurementsMetric = (ingredient) => {
    var convert = require('convert-units');
    var newAmt = ingredient.quantity;
    var minQty;
    var maxQty;
    if (!newAmt || newAmt.isNaN()) {
        minQty = ingredient?.minQty;
        maxQty = ingredient?.maxQty;
    }
    if (!ingredient.unit){
        return ingredient;
    }
    if (ingredient.unit === "ounce") {
        if (!minQty) {
            newAmt = convert(ingredient.quantity).from('oz').to('g');
        } else {
            minQty = convert(ingredient.minQty).from('oz').to('g');
            maxQty = convert(ingredient.maxQty).from('oz').to('g');
        }
        ingredient.unit = "gram";
        ingredient.unitPlural = "grams";
        ingredient.symbol = "g";
    } else if (ingredient.unit === "pound") {
        if (!minQty) {
            newAmt = convert(ingredient.quantity).from('lb').to('kg');
        } else {
            minQty = convert(ingredient.minQty).from('lb').to('kg');
            maxQty = convert(ingredient.maxQty).from('lb').to('kg');
        }
        ingredient.unit = "kilogram";
        ingredient.unitPlural = "kilograms";
        ingredient.symbol = "kg";
    } else if (ingredient.unit === "fluid ounce") {
        if (!minQty) {
            newAmt = convert(ingredient.quantity).from('fl-oz').to('ml');
        } else {
            minQty = convert(ingredient.minQty).from('fl-oz').to('ml');
            maxQty = convert(ingredient.maxQty).from('fl-oz').to('ml');
        }
        ingredient.unit = "mililitre";
        ingredient.unitPlural = "mililitres";
        ingredient.symbol = "ml";
    } else if (ingredient.unit === "pint" ||
                ingredient.unit === "quart" ||
                ingredient.unit === "gallon") {
        if (!minQty) {
            newAmt = ingredient.unit === "pint" ?
            convert(ingredient.quantity).from('pnt').to('l') :
            (ingredient.unit === "quart" ?
            convert(ingredient.quantity).from('qt').to('l') :
            convert(ingredient.quantity).from('gal').to('l'));
        } else {
            if (ingredient.unit === "pint") {
                minQty = convert(ingredient.minQty).from('pnt').to('l');
                maxQty = convert(ingredient.maxQty).from('pnt').to('l');
            } else if (ingredient.unit === "quart") {
                minQty = convert(ingredient.minQty).from('qt').to('l');
                maxQty = convert(ingredient.maxQty).from('qt').to('l');
            } else {
                minQty = convert(ingredient.minQty).from('gal').to('l');
                maxQty = convert(ingredient.maxQty).from('gal').to('l');
            } 
        }
        ingredient.unit = "litre";
        ingredient.unitPlural = "litres";
        ingredient.symbol = "l";
    }
    if (newAmt === 0) {
        newAmt = 1};
    if (minQty && minQty === 0) {
        minQty = 1;
        maxQty = maxQty === 0 ? 1 : maxQty;
    }
    if (Math.round(newAmt * 2) / 2 === 0 && newAmt !== 0 && newAmt > 0) {
        ingredient.quantity = 0.5;
    } else {
        ingredient.quantity = Math.round(newAmt * 2) / 2;
    }
    if (minQty && Math.round(minQty * 2) / 2 === 0 && minQty !== 0 && minQty > 0) {
        ingredient.minQty = 0.5;
    } else {
        ingredient.minQty = Math.round(minQty * 2) / 2;
    }
    if (maxQty && Math.round(maxQty * 2) / 2 === 0 && maxQty !== 0 && maxQty > 0) {
        ingredient.maxQty = 0.5;
    } else {
        ingredient.maxQty = Math.round(maxQty * 2) / 2;
    }
    return (ingredient);
}

export default convertMeasurementsMetric;
export {convertMeasurementsImperial};