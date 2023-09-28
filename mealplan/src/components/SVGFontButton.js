import { Box, ButtonBase } from "@mui/material";
import FontText from "./FontText";


const SVGFontButton = ({children, iconPos, sx, onClick, ariaLabel, ariaHasPopup, type, size, font, color, icon, disabled}) => {
    var style = {display: "flex", m: 2, alignItems: "center"};
    if (iconPos === "left" || iconPos === "right") {
        style = {
            ...style,
            flexDirection: "row",
        }
    } else {
        style = {
            ...style,
            flexDirection: "column",
        }
    }

    if (sx) {
        style = {
            ...style, 
            ...sx,
        }
    }

    return (
        <ButtonBase
            disabled={disabled}
            onClick={onClick && onClick}
            type={type ? type : "button"}
            aria-label={ariaLabel}
            aria-haspopup={ariaHasPopup ? ariaHasPopup : "false"}>
            <Box sx={style}>
                {(iconPos === "left" || iconPos === "top" || !iconPos) && icon}
                <FontText size={size} font={font} color={color}>
                {children}
                </FontText>
                {(iconPos === "right" || iconPos === "bottom") && icon}
            </Box>
        </ButtonBase>
    );
}

export default SVGFontButton;