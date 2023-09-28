import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userContext from '../util/userContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import submitRecipe from '../util/submitRecipe';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { EditNutritionInfo } from '../components/NutritionInfo';
import RecipeTags from '../components/RecipeTags';
import ModularEditList from '../components/ModularEditList';
import SelectRecipePicture from "../components/SelectRecipePicture";
import createRecipeID from '../util/createRecipeID';

const ImgPreview = ({imageURL}) => {
    return (
        <Box sx={{p: 1, display: 'flex', justifyContent: 'center', width: "60%"}}>
            <img alt="from original recipe" style={{maxWidth: "300px", height: "auto"}} src={imageURL} />
        </Box>
    )
}

  const findRecipeById = (recipes, id) => {
    const recipeObj = recipes?.find(recipe => recipe?.id === id);
    return recipeObj.data
  };

export default function EditRecipePage(props) {
    const recipeID = useParams();
    const user = useContext(userContext);
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(recipeID?.id ? findRecipeById(props.recipes, recipeID.id) : props.recipeProps);
    const [tags, setTags] = useState(recipe.tags);
    const [pictureIndex, setPictureIndex] = useState(0);

    const handleSubmit = async (e, user) => {
        e.preventDefault();
        try {
            let rID = recipeID?.id ? recipeID?.id : 0;
            if (rID === 0) {
                rID = await createRecipeID(user.uid, recipe.title);
            }
            const data = await submitRecipe(recipe, user, rID);
            const changeRecipes = props.recipes.filter((recipe) => recipe.id !== rID);
            changeRecipes.push({id: rID, data: data});
            props.callbackLoading(changeRecipes, props.setRecipes);
            navigate(`/recipes/${rID}`);
        } catch (error) {
            alert(error);
        }
      };

      useEffect(() => {
        setRecipe({...recipe, tags: tags});
      }, [tags])

      useEffect(() => {
        if(Array.isArray(recipe.image)) {
        setRecipe({...recipe, image: recipe.image[pictureIndex]});
        }
      }, [pictureIndex])
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe({
          ...recipe,
          [name]: value,
        });
      };
    
    return (
        <Card sx={{margin: 3}}>
           {recipe?.image && (Array.isArray(recipe.image) ?
                <Box >
                    <ImgPreview imageURL={recipe.image[pictureIndex]} />
                    <SelectRecipePicture pictures={recipe.image} index={pictureIndex} setPictureIndex={setPictureIndex}/>
                </Box>
                : <ImgPreview imageURL={recipe.image}/>)}
            <Box component="form" onSubmit={(e) => handleSubmit(e, user)}>
            <CardContent>
                <Grid container spacing={1} sx={{width: "60%"}}>
                    <Grid item xs={12}>
                        <TextField
                        sx={{m: 1, width: "90%"}}
                        required
                        id="outlined-required"
                        name="title"
                        onChange={handleInputChange}
                        label="Title"
                        defaultValue={recipe?.title}
                        />
                        <TextField
                        sx={{m: 1, width: "90%"}}
                        id="outlined-multiline-static"
                        name="description"
                        onChange={handleInputChange}
                        label="Description"
                        multiline
                        rows={4}
                        defaultValue={recipe?.description}
                        />
                        <FormControl sx={{m: 1, width: "90%"}}>
                            <InputLabel>Collection</InputLabel>
                            <Select
                            name="recipeCollection"
                            value={recipe?.recipeCollection}
                            label="Recipe Collection"
                            onChange={handleInputChange}
                            >
                            {user.recipeCollections.map((collection, index) => (
                                <MenuItem key={index} value={collection}>{collection}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <RecipeTags tags={recipe?.tags} user={user} value={tags} setValue={setTags}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                        sx={{m: 1}}
                        id="outlined-basic"
                        name="cookTime"
                        onChange={handleInputChange}
                        label="Cook Time"
                        defaultValue={recipe?.cookTime}
                        />
                        <TextField
                        sx={{m: 1}}
                        id="outlined-basic"
                        name="prepTime"
                        onChange={handleInputChange}
                        label="Prep Time"
                        defaultValue={recipe?.prepTime}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        sx={{m: 1}}
                        id="outlined-basic"
                        name="totalTime"
                        onChange={handleInputChange}
                        label="Total Time"
                        defaultValue={recipe?.totalTime}
                        />
                        <TextField
                        sx={{m: 1}}
                        id="outlined-basic"
                        name="servings"
                        onChange={handleInputChange}
                        label="Servings"
                        defaultValue={recipe?.servings}
                        />
                    </Grid>
                    {!user.settings.hideNutrition &&
                        <EditNutritionInfo
                                recipe={recipe}
                                setRecipe={setRecipe}
                                nutrition={recipe?.nutrition}
                                hideCalories={user.settings.hideCalories}/>
                    }
                    <ModularEditList 
                        type="ingredients"
                        originalList={recipe?.originalIngredientList}
                        recipe={recipe}
                        setRecipe={setRecipe}
                        />
                    <ModularEditList 
                        type="method"
                        originalList={recipe?.instructions}
                        recipe={recipe}
                        setRecipe={setRecipe}
                        />
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                variant="contained"
                type="submit"
                sx={{m:2}}
                >
                Save
                </Button>
                <Button
                variant="outlined"
                sx={{m:2}}
                >
                Discard
                </Button>
            </CardActions>
            </Box>
            </Card>
    )
}