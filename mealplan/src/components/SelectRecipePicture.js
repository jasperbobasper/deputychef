import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const SelectRecipePictures = ({pictures, index, setIndex}) => {
    const theme = useTheme();

    return (
        <MobileStepper
                    variant="dots"
                    steps={6}
                    position="static"
                    activeStep={index}
                    sx={{ maxWidth: 400, flexGrow: 1, bgcolor: "background.main" }}
                    nextButton={
                        <IconButton size="small" onClick={() => setIndex((prevIndex) => 
                            prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
                        )}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                        </IconButton>
                    }
                    backButton={
                        <IconButton size="small" onClick={() => setIndex((prevIndex) => 
                            prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
                        )}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        </IconButton>
                    }
                    />
    )
}

export default SelectRecipePictures;