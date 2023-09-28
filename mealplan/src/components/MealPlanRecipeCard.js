import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServingsDropdown from "./ServingsDropdown";
import Food from "../assets/Food.png";


const MealPlanRecipeCard = ({size, recipe, edit, servings, index, handleServings}) => {
    const navigate = useNavigate();
    const url = edit ? null : (servings === "" ? `/recipes/${recipe?.id}` : `/recipes/${recipe?.id}/${servings}`);
    const imgWidth = size === "small" ? 100 : 150;
    const [newServings, setNewServings] = useState(servings === "" ? recipe?.data.servings : servings);

    const handleServingsChange = (e) => {
        setNewServings(e.target.value);
        handleServings(e.target.value, index);
    }

    return (
        <Card onClick={() => navigate(url)} sx={{display: "flex", mb: 2, justifyContent: 'space-between'}}>
        <CardContent sx={{ flex: '2 0 0'}}>
            <Typography variant="subtitle1" >
                <b>{recipe?.data?.title}</b>
            </Typography>
            <div>
            {size !== "small" && (servings !== 0 ?
            (<div>
            <Typography variant="subtitle2">Servings: </Typography>
            {edit ? 
                <ServingsDropdown 
                originalServings={servings === "" ? recipe.data.servings : servings}
                servings={newServings}
                handleServingsChange={handleServingsChange}
                /> :
            (<Typography sx={{ml: 3.5, mb: 2, mt: 0.5}} variant="body1">
                {servings === "" ?
                recipe?.data?.servings :
                servings}
            </Typography>)}
            </div>) : <Typography variant="subtitle2" sx={{ml: 2}}>Leftovers</Typography>)}
            </div>
        </CardContent>
        <CardMedia
            component="img"
            sx={{ flex: '0 2 0', minWidth: imgWidth, maxHeight: imgWidth}}
            image={(recipe?.data?.image ? recipe?.data?.image : Food)}
            alt={recipe?.data?.title}
        />
        </Card>
    );
}


export default MealPlanRecipeCard;