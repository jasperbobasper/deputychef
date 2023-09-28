import { useState } from "react"
import { calculateWeeklyGroceries } from "../util/calculateGroceries"
import { Box, Button, Grid, IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import FontText from "./FontText";

const WeeklyGroceries = ({mealPlan, recipes}) => {
    const groceries = calculateWeeklyGroceries(mealPlan, recipes);

    const sx = {mt: 3,
        width: "100%", 
        height: "65vh", 
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
        }}

    return (
        <Box 
        sx={sx}>
            <FontText />
            <List sx={{ml: 5}}>
                {groceries.map((ingredient, index) => (
                    <ListItem key={index}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography variant="h6"><b>{ingredient.ingredient}</b></Typography>
                                    {ingredient.totals.map((total, index) => (
                                        <Typography key={index}>
                                            {total.amount} {total.unit},
                                        </Typography>
                                    ))}
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default WeeklyGroceries;