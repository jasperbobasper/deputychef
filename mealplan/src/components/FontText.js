import { Typography } from "@mui/material";

const FontText = ({children, component, size, font, color, sx}) => {

    const newSx = {...sx, 
    color: color};
    return (
        <Typography
            component={component && component}
            variant="smokum" 
            fontSize={size} 
            className={font} 
            sx={newSx}>
            {children}
        </Typography>
    )
}

export default FontText;