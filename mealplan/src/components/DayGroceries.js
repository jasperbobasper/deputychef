import { Box, Button, Grid, IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SeeReferences = ({groceries}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Grid container>
            <Grid item xs={2}>
        <Button size="small" variant="text" onClick={() => setExpanded(!expanded)}>
            {expanded ? "hide" : "show"}
        </Button>
            </Grid>
        {expanded &&
            <Grid item xs={10}>
            {groceries?.originalIngredients.map((grocery, index) => (
                <Box key={index}>
                    <Typography>{grocery.recipe} : </Typography>
                    <Typography>{grocery.ingredientName} {grocery.amount} {grocery.unit}</Typography>
                </Box>
            ))}
            </Grid>
        }
        </Grid>
    )
}

const DayGroceries = ({groceries}) => {
    if (groceries.length == 0 ) {
        return (
            <Typography sx={{ ml: 2,}}>Add a recipe to see today's ingredients</Typography>
        )
    }
    return (
        <Box sx={{ ml: 2, borderRadius: 1, bgcolor: "background.paper", color: "text.primary", boxShadow: 1, width: "85%", height: 400, overflow: "scroll", overflowX: "hidden"}}>
            <List>
                {groceries.map((ingredient, index) => (
                    <ListItem key={index}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography><b>{ingredient.ingredient}</b></Typography>
                                    {ingredient.totals.map((total, index) => (
                                        <Typography key={index}>
                                            {total.amount} {total.unit},
                                        </Typography>
                                    ))}
                            </Grid>
                            <Grid item xs={8}>
                                <SeeReferences groceries={ingredient} />
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
};

export default DayGroceries;