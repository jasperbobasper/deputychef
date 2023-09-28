import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DayGroceries from "./DayGroceries";
import calculateGroceries from "../util/calculateGroceries";
import MealPlanEdit from "./MealPlanEdit";
import DateFormatted from "../util/getDates";
import MealPlanRecipeCard from "./MealPlanRecipeCard";

const DayPanel = ({size, recipe, dayIndex, day, mealPlan, setMealPlan, edit, userCollections}) => {
    const [lunch, setLunch] = useState(day?.lunch);
    const [dinner, setDinner] = useState(day?.dinner);
    const [groceries, setGroceries] = useState(size === "small" ? null : calculateGroceries(recipe, day));
    const fontSize = size === "small" ? "20px" : "40px";
    const variant = size === "small" ? "h5" : "smokum";
    const sx= size === "small" ? {marginTop: 2,
        pr: 2,
        height: "250px",
        overflow: "scroll",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
        width: 10
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#DCD7C9"
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#A27B5C",
            borderRadius: 2
        }} : {
            m: 2, p:2, 
        }
    const date = new DateFormatted();

    useEffect(() => {
        setLunch([...day.lunch]);
        setDinner([...day.dinner]);
    }, [day]);

    return (
        <Box sx={{m: 2, p:2, }}>
            <Box sx={{display: "flex", flexDirection: "row", borderBottom: (size === "small") ? 2: 0, borderColor: "secondary.main",}}>
            <Typography variant={variant} className="wildwest" fontSize={fontSize} sx={{mr: 1}}>
                <b>{date.getDayName(dayIndex)}</b>
            </Typography>
            {size !== "small" &&
            <Typography variant="smokum" className="wildwest" fontSize={fontSize} sx={{mr: 1, whiteSpace: "nowrap", overflow: "visible"}}>
                <b>{date.getMonthName(dayIndex)}</b>
            </Typography>}
            <Typography variant={variant} className="wildwest" fontSize={fontSize} sx={{whiteSpace: "nowrap", overflow: "visible"}}>
                <b>{date.getFormattedDate(dayIndex)}</b>
            </Typography>
            <Typography variant={variant} className="wildwest" fontSize={size === "small" ? "10px" : "20px"}> 
                <b>{date.getDateModifier(dayIndex)}</b>
            </Typography>
            </Box>
    {!edit ? 
        (
            <Box sx={sx}>
                <Typography variant="h6">Lunch</Typography>
                {lunch.length > 0 ? lunch?.map((lunchItem, index) => <MealPlanRecipeCard size={size} key={index} recipe={recipe?.find((obj) => obj.id === lunchItem.recipeID)} meal="lunch" index={index} servings={lunchItem.servings} edit={edit}/>) :
                <Typography variant="subtitle2"> No Lunch Set </Typography>}
                <Typography variant="h6">Dinner</Typography>
                {dinner.length > 0 ? dinner?.map((dinnerItem, index) => <MealPlanRecipeCard size={size} key={index} recipe={recipe.find((obj) => obj.id === dinnerItem.recipeID)} meal="dinner" index={index} servings={dinnerItem.servings} edit={edit}/>) :
                <Typography variant="subtitle2"> No Dinner Set </Typography>}
            </Box>
            
        ) : ( 
            <div>
                <Box sx={{ml: 2}}>
                <MealPlanEdit
                size={size} 
                meal="Lunch" 
                mealArray={lunch} 
                recipe={recipe} 
                userCollections={userCollections} 
                setMealArray={setLunch} />
                <MealPlanEdit 
                size={size} 
                meal="Dinner" 
                mealArray={dinner} 
                recipe={recipe} 
                userCollections={userCollections} 
                setMealArray={setDinner} />
                </Box>
            </div>
        )
    }
    {size !== "small" && 
    <div>
        <Typography sx={{mt: 6, mb: 2}}variant="h6"><b>Today's Ingredients: </b></Typography>
        <DayGroceries groceries={groceries} />
    </div>}
    </Box>
   )
}

export default DayPanel;