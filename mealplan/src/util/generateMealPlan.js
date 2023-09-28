
const generateMealPlan = (ogMealPlan, servings, recipes, lunchLeftovers = false, dinnerLeftovers = false, include, exclude) => {
    let mealPlan = {};
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const assignLunchDinner = (day) => {
      let lunchRecipe = [{}];
      let dinnerRecipe = [{}];

      if (ogMealPlan[daysOfWeek[day]].lunch.length > 0) {
        lunchRecipe = ogMealPlan[daysOfWeek[day]].lunch;
      } else {
        if (dinnerLeftovers && day !== 0) {
          lunchRecipe[0].recipeID = mealPlan[daysOfWeek[day - 1]].dinner[0].recipeID;
          lunchRecipe[0].servings = 0;
        } else {
          if (shuffledRecipes.length === 0) {
            shuffledRecipes = shuffle(recipes);
          }
          const rec = shuffledRecipes.pop();
          lunchRecipe[0].recipeID = rec?.id;
          lunchRecipe[0].servings = lunchLeftovers ? servings * 2 : servings;
        }
        
      } 
      if (ogMealPlan[daysOfWeek[day]].dinner.length > 0) {
        dinnerRecipe = ogMealPlan[daysOfWeek[day]].dinner;
      } else {
        if (lunchLeftovers) {
          dinnerRecipe[0].recipeID = lunchRecipe[0].recipeID;
          dinnerRecipe[0].servings = 0;
        } else {
          if (shuffledRecipes.length === 0) {
            shuffledRecipes = shuffle(recipes);
          }
          const rec = shuffledRecipes.pop();
          dinnerRecipe[0].recipeID = rec?.id;
          dinnerRecipe[0].servings = dinnerLeftovers ? servings * 2 : servings;
        }
        
      }
      mealPlan = {...mealPlan, 
        [daysOfWeek[day]]:
        {
          lunch: [...lunchRecipe],
          dinner: [...dinnerRecipe],
        }
      };
    }
  
    let shuffledRecipes = shuffle(recipes);

    for (let day = 0; day < 7; day++) {
      assignLunchDinner(day);
    }
    return mealPlan;
    };
  
  // Helper function to shuffle an array
  const shuffle = (input) => {
    const array = [...input];

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  export default generateMealPlan