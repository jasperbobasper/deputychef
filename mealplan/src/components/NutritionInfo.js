import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));

const NutritionInfo = ({nutrition, hideCalories}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion 
        expanded={expanded} 
        onChange={() => setExpanded(!expanded)}
        sx={{boxShadow: "none", border: 0}}
        >
            <AccordionSummary
            aria-controls={`Nutrition-content`}
            id={`Nutrition-header`}
            sx={{p: 0, m: 0}}
            >
            <Typography variant="h6"><b>Nutrition Info</b></Typography>
            {!expanded ? <ExpandMoreIcon sx={{mt: 0.7, }}/> :
            <ExpandMoreIcon sx={{mt: 0.7, transform: "rotate(180deg)"}} />}
            </AccordionSummary>
            <AccordionDetails>
                <CardContent>
                    <Grid container spacing={1} sx={{width: "60%", borderTop:1, borderLeft: 1}}>
                    {nutrition.map((nutrient, index) => (
                        !(nutrient.ingredient === "calories" && hideCalories) && 
                        (<Grid key={index} item xs={6} sx={{borderRight:1, borderBottom:1, p:0.5}}>
                            <Typography variant='subtitle2'>{nutrient.ingredient}</Typography>
                            <Typography>{nutrient?.quantity} {nutrient?.symbol}</Typography>
                        </Grid>)
                    ))}
                    </Grid>
                </CardContent>
            </AccordionDetails>
        </Accordion>
    )
}

const EditNutritionInfo = ({recipe, setRecipe, nutrition, hideCalories}) => {
    const [expanded, setExpanded] = useState(false);
    const [nutritionInfo, setNutritionInfo] = useState(nutrition);

    const handleIngredientChange = (e) => {
        const {name, value} = e.target;

        const newNutrition = nutritionInfo;
        nutritionInfo.map(nutrient => {
            if (nutrient.ingredient === name) {
                return {
                    ...nutrient,
                    quantity: value,
                };
            } else {
                return nutrient;
            }
        });
        setNutritionInfo(newNutrition);
        setRecipe({
            ...recipe,
            nutrition: newNutrition,
          });
    }

    return (
        <Accordion 
        expanded={expanded} 
        onChange={() => setExpanded(!expanded)}
        sx={{boxShadow: "none", border: 0}}>
        <AccordionSummary
        aria-controls={`editNutrition-content`}
        id={`editNutrition-header`}>
        <Typography variant="h6"><b>Edit Nutrition Info</b></Typography>
        {!expanded ? <ExpandMoreIcon sx={{mt: 0.7, }}/> :
        <ExpandMoreIcon sx={{mt: 0.7, transform: "rotate(180deg)"}} />}
        </AccordionSummary>
        <AccordionDetails>
            <CardContent>
                <Grid container spacing={2}> 
                {nutritionInfo?.map((nutrient, index) => (
                        !(nutrient.ingredient === "calories" && hideCalories) && 
                        (<Grid key={index} item xs={6}>
                            <TextField
                            name={`${nutrient.ingredient}`}
                            onChange={(e) => handleIngredientChange(e)}
                            label={nutrient?.unitPlural ? nutrient.ingredient + " (" + nutrient.unitPlural + ")" : nutrient.ingredient}
                            defaultValue={nutrient?.quantity}/>
                        </Grid>)
                    ))}
                </Grid>
            </CardContent>
        </AccordionDetails>
  </Accordion>
    )
}

export default NutritionInfo;
export {EditNutritionInfo};