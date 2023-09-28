

const addIngredientsToGroceryList = (groceryList, title, ingredients, ingredientList, servings, originalServings) => {
  ingredients.forEach((ingredientBase, index) => {
      const ingredient = ingredientList[index];
      const { quantity, unit} = ingredient;
      const ingredientName = ingredient.ingredient;
      const ogAmount = (quantity / originalServings) * servings;
      const amount = Math.round(ogAmount * 2) / 2;

      if (ingredientName === "salt" || ingredientName === "pepper"
        || ingredientName === "salt and pepper" 
        || ingredientName === "salt & pepper") {
        return;
      }
      const existingIngredient = groceryList.find(
      (item) => item.ingredient === ingredientBase
    );
    if (amount === 0) return;
    if (existingIngredient) {
      // If it exists, update the amount
      const i = groceryList.indexOf(existingIngredient);
      const existingAmount = existingIngredient.totals.find(
          (item) => item.unit === unit);
      if (existingAmount) {
          const ii = existingIngredient.totals.indexOf(existingAmount);
          groceryList[i].totals[ii].amount += amount;
      } else {
          groceryList[i].totals.push({amount: amount, unit: unit});
      }
    } else {
      // If it doesn't exist, add a new entry
      groceryList.push({
        ingredient: ingredientBase,
        totals: [{amount: amount, unit: unit}],
        originalIngredients: [{
              ingredientName: ingredientName,
              amount: amount,
              unit: unit,
              recipe: title,
          }]
        
      });
    }
  });
};


export default function calculateGroceries(recipes, day) {
        const groceryList = [];
        const { lunch, dinner } = day;
        const processMeal = (meal, recipeType) => {
            meal?.forEach((mealItem) => {
                const { recipeID, servings } = mealItem;
                const recipe = recipes?.find((r) => r.id === recipeID);
        
                if (recipe) {
                const { ingredients, ingredientList, title} = recipe.data;
                const originalServings = recipe.data.servings;
                addIngredientsToGroceryList(groceryList, title, ingredients, ingredientList, servings, originalServings);
                }
            });
        };

        processMeal(lunch, 'lunch');
        processMeal(dinner, 'dinner');
    return groceryList;
};

const calculateWeeklyGroceries = (mealPlan, recipes) => {
  const groceryList = [];
  for (const day in mealPlan) {
    const dayList = calculateGroceries(recipes, mealPlan[day]);
    dayList.forEach((ingredient) => {
      const existingIngredient = groceryList.find(
        (item) => item.ingredient === ingredient.ingredient
      );
      if (existingIngredient) {
        // If it exists, update the amount
        const i = groceryList.indexOf(existingIngredient);
        existingIngredient?.totals?.forEach((unit) => {
          const existingAmount = existingIngredient.totals.find(
            (item) => item.unit === unit.unit);
          if (existingAmount) {
              const ii = existingIngredient.totals.indexOf(existingAmount);
              groceryList[i].totals[ii].amount += unit.amount;
          } else {
              groceryList[i].totals.push({amount: unit.amount, unit: unit.unit});
          }
        })
      } else {
        groceryList.push(ingredient);
      }
    })
  }
  return (groceryList);
}

export {calculateWeeklyGroceries};