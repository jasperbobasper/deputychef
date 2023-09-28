import axios from 'axios';

const fetchRecipe = async (sourceURL) => {
    const options = {
        method: 'GET',
        url: 'https://cookr-recipe-parser.p.rapidapi.com/getRecipe',
        params: {
          source: sourceURL
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_KEY,
          'X-RapidAPI-Host':  process.env.REACT_APP_COOKR_HOST,
        }
      };
      
      try {
          const response = await axios.request(options);
          return(response.data);
      } catch (error) {
          console.error(error);
      }
}

export default fetchRecipe;