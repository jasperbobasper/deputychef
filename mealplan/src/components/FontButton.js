import { ButtonBase } from "@mui/material"
import FontText from "./FontText"

const FontButton = ({children, onClick, font, size, bgcolor, color, type, variant, sx}) => {
    var style;
    if (variant === "contained") {
        style = {
            bgcolor: bgcolor? bgcolor : "primary.main",
            p: 2, 
            borderRadius: 1,
        }
    } else if (variant === "outlined") {
        style = {
            bgcolor: bgcolor? bgcolor : "inherit",
            p: 2, 
            borderRadius: 1,
            color: color,
            border: 2,
        }
    } else {
        style = {
            p: 2, 
            borderRadius: 1,
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
            type={type ? type : "button"}
            onClick={onClick && onClick}
            sx={style} >
            <FontText size={size} font={font} color={color? color : "inherit"}>
                {children}
            </FontText>
        </ButtonBase>
    )
}

export default FontButton;