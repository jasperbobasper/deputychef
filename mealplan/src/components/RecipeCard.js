import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import Food from "../assets/Food.png";

const RecipeCard = ({id, recipeData, setOpen, setDeleteRecipe}) => {
    const handleClick = () => {
      setOpen(true);
      setDeleteRecipe(id);
    }
  
    const navigate = useNavigate();
      return (
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
          <CardMedia
              component="div"
              sx={{
                  // 16:9
                  pt: '56.25%',
                  cursor: "pointer"
                }}
              image={(recipeData?.image ? recipeData?.image : Food)}
              onClick={() => navigate(`/recipes/${id}`)}
          />
          <CardContent sx={{cursor: "pointer"}} onClick={() => navigate(`/recipes/${id}`)}>
              <Typography 
                sx={{cursor: "pointer"}}
                gutterBottom 
                variant="h6" >
                  <b>{recipeData?.title}</b>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{cursor: "pointer"}}
                >
                  {recipeData?.description}
              </Typography>
          </CardContent>
          <CardActions sx={{pr: 2, justifyContent: 'right'}}>
              <IconButton aria-label="edit" onClick={() => navigate(`/recipes/edit/${id}`)}>
                  <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleClick()} aria-label="delete">
                  <DeleteIcon />
              </IconButton>
          </CardActions>
        </Card>
      )
  }

  export default RecipeCard;