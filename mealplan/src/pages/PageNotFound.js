import { Box, Typography } from "@mui/material";
import sadCowboy from "../assets/pensive_cowboy.png";

export default function PageNotFound() {
    return (
        <Box sx={{ mt: "20%", width: "100%", display: "flex", justifyContent: "center"}}>
            <Box sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center"}}>
                <img src={sadCowboy} style={{width: "30%"}}/>
                <Typography variant="smokum" component="h1" fontSize="80px" className="smokum">Yee Aww...</Typography>
                <Typography variant="h5">Sorry partner... I couldn't find what you were lookin' for</Typography>
            </Box>
        </Box>
    );  
};