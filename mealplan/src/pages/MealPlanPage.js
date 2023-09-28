import React, { useContext, useState } from 'react';
import PageNotFound from './PageNotFound';
import { IconButton } from '@mui/material';
import userContext from '../util/userContext';
import { doc, setDoc} from 'firebase/firestore';
import { db } from '../firebase';
import Grid from '@mui/material/Grid';
import mealPlanID from "../util/mealPlanID";
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DayPanel from '../components/DayPanel';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DateFormatted from '../util/getDates';
import FontText from '../components/FontText';
import generateMealPlan from '../util/generateMealPlan';
import RandomMealPlan from '../components/RandomMealPlan';
import ClearIcon from '@mui/icons-material/Clear';
import WeeklyGroceries from '../components/WeeklyGroceries';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function MealPlanPage(props){
    const user = useContext(userContext);
    
    const [newMealPlan, setNewMealPlan] = useState(props.mealPlan);
    const [edit, setEdit] = useState(false);
    const date = new DateFormatted();
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const [value, setValue] = useState(props?.day ? (props.day === 0 ? 7 : props.day) : 0);

    const mealPlanRef = doc(db, "users", user.uid, "mealPlans", mealPlanID());
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = () => {
        try {
            setDoc(mealPlanRef, newMealPlan);
            props.setMealPlan(newMealPlan);
        } catch (error) {
            alert(error);
        }
        setEdit(false);
    }

    const handleRandom = (servings, leftoversLunch, leftoversDinner) => {
        const randomMealPlan = generateMealPlan({...newMealPlan}, servings, props.recipes, leftoversLunch, leftoversDinner);
        setNewMealPlan({...randomMealPlan});
    }

    const handleReset = () => {
        setNewMealPlan({...props.mealPlan});
    }

    const handleExit = () => {
        setNewMealPlan({...props.mealPlan});
        setEdit(false);
    }

    const handleClear = () => {
        setNewMealPlan({
            Monday: {lunch: [], dinner: []},
            Tuesday: {lunch: [], dinner: []},
            Wednesday: {lunch: [], dinner: []},
            Thursday: {lunch: [], dinner: []},
            Friday: {lunch: [], dinner: []}, 
            Saturday: {lunch: [], dinner: []}, 
            Sunday: {lunch: [], dinner: []},
        });
    }

    if (!newMealPlan) {
        return <PageNotFound/>
    }
    return (
        <Box sx={{marginTop: 4, 
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center'}}>
            <Grid container sx={{
                marginTop: 3,
                marginBottom: 6,
                display: 'flex',
                flexDirection: 'row'}}>
                <Grid item xs={2}>
                    <Box sx={{mt: 4, mb: 16}}>
                        <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Overview" {...a11yProps(0)} />
                            {weekdays.map((day, index) => (
                                <Tab key={index} label={day.substring(0, 3)} {...a11yProps(index + 1)} />
                            ))}
                            <Tab label="Groceries" {...a11yProps(8)} />
                        </Tabs>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{width: "90%", minHeight: "100%", bgcolor: "background.main", ml: 2, borderRadius: 5}}>
                    {value !== 8 && (edit ?
                    (<Box>
                        <IconButton onClick={handleExit} sx={{mt: 2, mr: 2, position: "relative", float: "right"}}>
                            <ClearIcon sx={{color: "white"}}/>
                        </IconButton>
                        <IconButton onClick={handleSubmit} sx={{mt: 2, mr: 2, position: "relative", float: "right"}}>
                            <SaveIcon sx={{color: "white"}}/>
                        </IconButton>
                    </Box>) : (
                        <IconButton onClick={() => setEdit(true)} sx={{mt: 2, mr: 2, position: "relative", float: "right"}}>
                            <EditIcon sx={{color: "white"}}/>
                        </IconButton>
                    ))}
                    <TabPanel value={value} index={0}>
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <FontText size={"40px"} font={"wildwest"}><b>{date.getWeekSpan()}</b></FontText>
                            {edit && <RandomMealPlan handleRandom={handleRandom} handleReset={handleReset} handleClear={handleClear}/>}
                            <Grid container>
                                {weekdays.map((day, index) => (
                                    <Grid item xs={6} key={index}>
                                        <DayPanel
                                        size="small"
                                        recipe={props.recipes}
                                        dayIndex={index}
                                        day={newMealPlan[day]} 
                                        mealPlan={newMealPlan} 
                                        setMealPlan={setNewMealPlan} 
                                        edit={edit}
                                        userCollections={user.recipeCollection}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </TabPanel>
                    {weekdays.map((day, index) => (
                                <TabPanel key={index} value={value} index={index + 1}>
                                    <DayPanel 
                                    size="large"
                                    recipe={props.recipes}
                                    dayIndex={index}
                                    day={newMealPlan[day]} 
                                    mealPlan={newMealPlan} 
                                    setMealPlan={setNewMealPlan} 
                                    edit={edit}
                                    userCollections={user.recipeCollection}/>
                                </TabPanel>
                            ))}
                    <TabPanel value={value} index={8}>
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <FontText size={"30px"} font={"wildwest"}><b>Groceries {date.getWeekSpan()}</b></FontText>
                           <WeeklyGroceries mealPlan={props.mealPlan} recipes={props.recipes}/>
                        </Box>
                    </TabPanel>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}