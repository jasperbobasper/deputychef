import { useContext } from "react";
import userContext from "../util/userContext";

import DayPanel from "../components/DayPanel";
import { Box } from "@mui/material";
import LoadingPage from "./LoadingPage";
import Cowboy from "../components/Cowboy";
import FirstLogin from "../components/FirstLogin";
import DateFormatted from "../util/getDates";

const HomePage = (props) => {
    const user = useContext(userContext);
    const d = new DateFormatted();

    if (user.firstLogin === true) {
        return <FirstLogin user={user} setUser={props.setUser}/>
    }
    if (!props.mealPlan) {
        return <LoadingPage/>
    }
    return (
        <Box sx={{ mt: 10, width: "60%"}}>
            <DayPanel 
                recipe={props.recipes} 
                day={props?.mealPlan[d.getDayName(d.getDay() - 1)]}
                dayIndex={d.getDay() - 1}
                mealPlan={props.mealPlan} 
                setMealPlan={props.setMealPlan} 
                edit={false}/>
            <Cowboy 
                sx={{position: "absolute", 
                bottom: "30%", 
                right: "10%", 
                width: "30%", 
                minWidth: "20%", 
                height: "auto"}} 
                name={user.name}/>
        </Box>
    );
};

export default HomePage;