import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import PageNotFound from './PageNotFound';
import { Typography } from '@mui/material';
import userContext from '../util/userContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import calculateServings from '../util/calculateServings';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import IconButton from '@mui/material/IconButton';
import NutritionInfo from '../components/NutritionInfo';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AlertDeleteRecipe from '../components/AlertDeleteRecipe';
import ServingsDropdown from '../components/ServingsDropdown';

const findRecipeById = (recipes, id) => {
    const recipeObj = recipes?.find(recipe => recipe?.id === id);
    if (!recipeObj) {
        return null;
    }
    return recipeObj.data
  };


export default function RecipePage(props) {
    const recipeID = useParams();
    const user = useContext(userContext);
    const [loading, setLoading] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const recipe = useMemo(() => findRecipeById(props.recipes, recipeID.id), [props.recipes, recipeID.id]);
    const [ingredientList, setIngredientList] = useState();
    const [servings, setServings] = useState();

    const handleDelete = () => {
        try {
            deleteDoc(doc(db, "users", user.uid, "recipes", recipeID.id));
            setOpen(false);
            navigate("/recipes");
        } catch (error) {
            alert(error);
        }
    } 

    useEffect(() => {
        if (recipe) {
            if (recipeID?.servings && recipeID.servings !== "0") {
                setServings(recipeID.servings);
                setIngredientList(calculateServings(recipe, recipeID.servings));
            } else {
                setServings(recipe.servings);
                setIngredientList(recipe.ingredientList);
            }
        }
    }, []);

    const handleServingsChange = (e) => {
        const newServings = parseInt(e.target.value, 10);
        const newIngredientList = calculateServings(recipe, newServings);
        setIngredientList(newIngredientList);
        setServings(newServings);
    }

    if (loading) {
        return <LoadingPage />
    } else if (!loading && !recipe) {
        return <PageNotFound />
    } else {
        return (
            <Card sx={{margin: 3}}>
                <AlertDeleteRecipe open={open} setOpen={setOpen} handleDelete={handleDelete}/>
                <CardContent>
                    <Box>
                    {recipe?.image && 
                    <img
                    alt={`${recipe.title}`}
                    style={{ maxWidth : "70%", 
                    height: "auto"}}
                    loading="lazy" 
                    src={recipe.image} />}
                    </Box>
                    {recipe.recipeCollection !== "None" && 
                    <Chip label={recipe.recipeCollection}
                        color="secondary"  
                        href="#basic-chip" clickable />}
                    {recipe?.tags && (Array.isArray(recipe?.tags) ? 
                        recipe.tags.map((tag, index) => (
                            <Chip key={index} label={tag} href="#basic-chip" clickable />
                        )) : <Chip label={recipe.tag} href="#basic-chip" clickable />
                    )}
                    <Typography gutterBottom variant="smokum" component="div" className="wildwest" fontSize="50px" sx={{mt: 5}}>
                     <b>{recipe.title}</b>
                     <a href={recipe?.originalURL} target="_blank" rel="noreferrer" style={{color: "#A27B5C"}}>
                        <InsertLinkIcon sx={{ml: 2}}/>
                    </a>
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ml: 2}}>
                        Cook time: {recipe?.cookTime} | Prep Time: {recipe?.prepTime} | Total Time: {recipe?.totalTime}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{mt: 1, ml:2}}>
                        Servings:
                    </Typography>
                    <ServingsDropdown originalServings={recipe.servings} servings={servings} handleServingsChange={handleServingsChange} /> 
                    <Typography variant="subtitle1" sx={{maxWidth: "90%"}}>
                        <i>{recipe.description}</i>
                    </Typography>
                    
                    <Typography variant="h6" sx={{mt: 2}}><b>Ingredients:</b></Typography>
                    <List sx={{
                        listStyleType: 'disc',
                        pl: 6,
                        '& .MuiListItem-root': {
                        display: 'list-item',
                        },
                        }}>
                    {ingredientList && ingredientList.map((ingredient, index) => (
                         <ListItem key={index} disablePadding>
                            {ingredient?.quantity && !ingredient.quantity.isNaN() ? ingredient.quantity : 
                            (ingredient?.minQty ? `${ingredient.minQty} - ${ingredient.maxQty}` : "")} {ingredient.symbol ? 
                            ingredient.symbol : (ingredient.quantity !== 1 ? 
                            ingredient.unitPlural : ingredient.unit)} {ingredient.ingredient}
                        </ListItem>
                    ))}
                    </List>
                    {!user.settings.hideNutrition &&
                        <NutritionInfo
                                nutrition={recipe.nutrition}
                                hideCalories={user.settings.hideCalories}/>
                    }
                    <Box sx={{maxWidth: "70%"}}>
                    <Typography variant="h6" sx={{mt: 2}}><b>Method:</b></Typography>
                    <List sx={{ listStyle: "decimal", pl: 4 }}>
                    {recipe?.instructions && recipe?.instructions.map((instruction, index) => (
                        <ListItem sx={{ display: "list-item" }} key={index}>
                            {instruction.text}
                        </ListItem>
                    ))}
                    </List>
                    </Box>
                </CardContent>
                <CardActions sx={{mr: 6, mb: 2, justifyContent: 'right'}}>
                    <IconButton aria-label="edit" onClick={() => navigate(`/recipes/edit/${recipeID.id}`)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setOpen(true)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
                </Card>
        )
    }
}