import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../util/userContext";
import { db } from "../firebase";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {doc, deleteDoc} from "firebase/firestore";
import Divider from '@mui/material/Divider';
import LoadingPage from "./LoadingPage";
import AddNewCollection from "../components/AddNewCollection";
import AlertDeleteRecipe from "../components/AlertDeleteRecipe";
import sortRecipes from "../util/sortRecipes";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import RecipeCard from "../components/RecipeCard";
import FontButton from "../components/FontButton";

const SortedRecipes = ({recipeCollections, sortedRecipes, open, setOpen, setDeleteRecipe}) => {
  //Return Grid of either categorised or uncategorised recipe cards

  return (
    <div>
    {recipeCollections ? (
      sortedRecipes?.map((group, index) => (
        <div key={index}>
        <Divider sx={{mb: 2}} textAlign="left">{group.collection}</Divider>
        <Grid container  spacing={4}>
          {group?.recipes?.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                  <RecipeCard 
                  id={recipe.id} 
                  recipeData={recipe.data} 
                  open={open} 
                  setOpen={setOpen} 
                  setDeleteRecipe={setDeleteRecipe}/>
              </Grid>
          ))}
          </Grid>
        </div>
      ))
      ) : (
        <Grid container  spacing={4}>
          {sortedRecipes?.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                  <RecipeCard 
                  id={recipe.id} 
                  recipeData={recipe.data} 
                  open={open} 
                  setOpen={setOpen} 
                  setDeleteRecipe={setDeleteRecipe} />
              </Grid>
          ))}
          </Grid>
      )}
    </div>
  )
}

const AllRecipesPageActions = () => {
  // Add new recipe or collection Buttons

  const navigate = useNavigate();
  const [addNewCollection, setAddNewCollection] = useState(false);

  return (
      <div>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <FontButton 
            onClick={() => navigate("/recipes/add")}
            font="wildwest"
            size="15px"
            bgcolor="primary.main"
            color="white.main"
            variant="contained"
            >
            Add New Recipe
          </FontButton>
          <FontButton 
            onClick={() => setAddNewCollection(!addNewCollection)}
            font="wildwest"
            size="15px"
            color="primary.main"
            variant="outlined"
            >
            Add New collection
          </FontButton>
        </Stack>
        {addNewCollection && <AddNewCollection setAddNewCollection={setAddNewCollection}/>}
      </div>
  )
}

const RecipeSortSelect = ({recipeCollections, selectValue, handleChange}) => {
  //Select component for Sort type

  return (
    <FormControl >
    <InputLabel htmlFor="sort-label">Sort</InputLabel>
    <Select
      native
      labelId="sort-label"
      id="sort"
      value={selectValue}
      label="Sort"
      onChange={handleChange}
      sx={{maxHeight: 40, mb: 2}}
    >
      <option value={"default"}>Default</option>
      <option value={"dateAdded"}>Date Added</option>
      <option value={"alphabetical"}>alphabetical</option>
      <optgroup label="Collections">
        {recipeCollections?.map((collection, index) => (
          <option 
            value={`collections ${recipeCollections[index]}`}
            key={index}>
              {collection}
          </option>
        ))}
      </optgroup>
  </Select>
  </FormControl>);
}

export default function AllRecipesPage(props) {
  // Lists all of user's recipes in a neat grid. 
  // Recipes can be sorted in a variety of ways 
  // They can also be edited or deleted

    const user = useContext(userContext);

    const [loading, setLoading] = useState(true);
    const [recipeCollections, setRecipeCollections] = useState(true);
    const [open, setOpen] = useState(false);
    const [deleteRecipe, setDeleteRecipe] = useState(null);
    const [sortType, setSortType] = useState("default");
    const initialState = useMemo(() => sortRecipes(sortType, props.recipes), [sortType, props.recipes]);
    const [sortedRecipes, setSortedRecipes] = useState(initialState);
    const [selectValue, setSelectValue] = useState("default");

    const handleDelete = async (id) => {
      if (id) {
        const recipeRef = doc(db, "users", user.uid, "recipes", id);
        try {
            props.callbackLoading(props.recipes.filter(a => a.id !== id), props.setRecipes);
            await deleteDoc(recipeRef);
            setDeleteRecipe(null);
            setOpen(false);
        } catch (error) {
            alert(error);
        }
      }
    }

    useEffect(() => {
      //control loading once state has changed
      setLoading(false);
    }, [sortedRecipes])
    
    const handleChange = (e) => {
      //Sort recipes according to select value
      setSelectValue(e.target.value);
      setLoading(true);
      if (e.target.value === "default" || e.target?.value.split(" ")[0] === "collections") {
          setRecipeCollections(true);
      } else {
        setRecipeCollections(false);
      }
      setSortedRecipes(sortRecipes(e.target.value, props.recipes));
      setSortType(e.target.value);
      setLoading(false);
    }

    if (loading) {
        return <LoadingPage />
    } 
    return (
      <Box sx={{m: 3}}>
        <AlertDeleteRecipe open={open} setOpen={setOpen} handleDelete={() => handleDelete(deleteRecipe)}/>
        <AllRecipesPageActions />
        <Container sx={{ py: 8 }}>
          <RecipeSortSelect 
            recipeCollections={user.recipeCollections} 
            selectValue={selectValue} 
            handleChange={handleChange}/>
          {(!loading && !sortedRecipes) ? 
          <Typography>
            Error Loading Recipes
          </Typography> : (
            <SortedRecipes 
            recipeCollections={recipeCollections} 
            sortedRecipes={sortedRecipes}
            open={open} 
            setOpen={setOpen} 
            handleDelete={handleDelete}
            setDeleteRecipe={setDeleteRecipe}/>
            )}
        </Container>
    </Box>
    );
  }