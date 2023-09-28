const calculateServings = (recipe, newServings) => {
    const newIngredientList = recipe.ingredientList.map((ingredient) => {
        const newQuantity = (ingredient.quantity / recipe.servings) * newServings;
        const roundDown = Math.round(newQuantity * 2) / 2;
        return { ...ingredient, quantity: roundDown === 0 ? newQuantity : roundDown};
      });

    return newIngredientList;
}

export default calculateServings;