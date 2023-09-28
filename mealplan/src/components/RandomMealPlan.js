import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FontButton from '../components/FontButton';
import ServingsDropdown from '../components/ServingsDropdown';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, FormControlLabel, Box, Typography} from '@mui/material';

const RandomMealPlan = ({handleRandom, handleReset, handleClear}) => {
    const [servings, setServings] = React.useState(4);
    const [leftovers, setLeftovers] = React.useState();
    const [expanded, setExpanded] = React.useState(false);

    const handleClick = () => {
        handleRandom(servings, (leftovers === "lunchLeftovers"),(leftovers === "dinnerLeftovers"));
    }

    return (
        <Box sx={{m: 2, display: "flex", flexDirection: "column"}}>
            <FontButton font="cowboy" size="25px" variant="contained" color="white.main" bgcolor="secondary.main" onClick={handleClick}>Randomise Meal Plan</FontButton>
            <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={handleClear}>Clear All</Button>
            </Box>
            <Accordion sx={{boxShadow: "none", border: 0, bgcolor: "background.main"}} expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                aria-controls="random-generator-settings"
                sx={{p: 0, m: 0, border: 0}}
                id="random-generator-settings-header">
                <Typography>Options</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography>Servings per Meal: </Typography>
                    <ServingsDropdown
                    originalServings={4}
                    servings={servings}
                    handleServingsChange={(e) => setServings(e.target.value)}
                    />
                    <FormControl onChange={(e) => setLeftovers(e.target.value)}>
                        <FormLabel id="leftovers">Leftovers: </FormLabel>
                        <RadioGroup
                            aria-labelledby="leftovers-label"
                            name="leftovers-group"
                            defaultValue={0}
                        >
                            <FormControlLabel value={0} control={<Radio />} label="None" />
                            <FormControlLabel value="lunchLeftovers" control={<Radio />} label="Leftover Lunch for Dinner" />
                            <FormControlLabel value="dinnerLeftovers" control={<Radio />} label="Leftover Dinner for Tomorrow's Lunch" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                </AccordionDetails>
            </Accordion>
            
        </Box>
    )
}

export default RandomMealPlan;