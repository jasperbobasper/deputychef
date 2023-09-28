export default function sortRecipes(sort, recipes) {
    // console.log(sort)
    const searchTerm = sort.split(" ");
    // console.log(recipes);
    let sortedRecipes = [];
    if (sort === "default") {
        const recipesByCollection = {};

        recipes?.forEach((recipe) => {
        const collection = recipe?.data?.recipeCollection;

        // If the collection doesn't exist in recipesByCollection, create it
        if (!recipesByCollection[collection]) {
            recipesByCollection[collection] = [];
        }
        
        // Add the recipe to the collection
        recipesByCollection[collection].push(recipe);
        });
        // Convert the object into an array of objects with the desired structure
        sortedRecipes = Object.keys(recipesByCollection).map((collection) => ({
        collection: collection,
        recipes: recipesByCollection[collection],
        }));
    } else if (sort === "alphabetical") {
        sortedRecipes = recipes;
        sortedRecipes.sort((a, b) => {
            const titleA = a?.data?.title.toLowerCase();
            const titleB = b?.data?.title.toLowerCase();
          
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          });
    } else if (sort === "dateAdded") {
        sortedRecipes = recipes;
        recipes.sort((a, b) => {
            const dateAddedA = a?.data?.dateAdded;
            const dateAddedB = b?.data?.dateAdded;
          
            return dateAddedA - dateAddedB;
          });          
    } else if (searchTerm[0] === "collections") {
        console.log("sort by collection");
        recipes?.forEach((recipe) => {
            if (recipe?.data?.recipeCollection === searchTerm[1]) {
                sortedRecipes.push(recipe);
            }
        })
        return 
    } else if (searchTerm[0] === "tag") {
        recipes?.forEach((recipe) => {
            if (recipe?.data?.category === searchTerm[1] ||
                recipe?.data?.cuisine === searchTerm[1] ||
                recipe?.data?.diet === searchTerm[1]) {
                sortedRecipes.push(recipe);
            }
        })
    }
    // console.log(sortedRecipes);
    return sortedRecipes;
}