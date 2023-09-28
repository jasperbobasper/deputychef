import React, { useEffect, useState } from 'react';
import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";
import img4 from "../assets/img/img4.jpg";
import {ReactComponent as Logo} from "../assets/Logo.svg";
import { Typography, Box } from '@mui/material';

const images = [
  {
    imgPath: img1,
    label: "Cucumbers, dill, yellow beans and cherry tomatoes on a wooden board",
    attr: "Nadine Primeau",
    link: "https://unsplash.com/@nadineprimeau",
  },
  {
    imgPath: img2,
    label: "A selection of fresh vegetables with high contrast shadow",
    attr: "Marisol Benitez",
    link: "https://unsplash.com/@marisolbenitez",
  },
  {
    imgPath: img3,
    label: "Chard with yellow and pink stalks on dark blue marble",
    attr: "Heather Barnes",
    link: "https://unsplash.com/@heatherbarnes",
  },
  {
    imgPath: img4,
    label: "White garlic, cloves scattered, on dark grey marble",
    attr: "Tijana Drndarski",
    link: "https://unsplash.com/@izgubljenausvemiru",
  }
]
const delay = 4500;

const Slideshow = ({style, disabled = false}) => {
    const [index, setIndex] = useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

    useEffect(() => {
      if (!disabled) {
        resetTimeout();
        timeoutRef.current = setTimeout(() => 
            setIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            ),
            delay
        );
        return () => {
            resetTimeout();
        }; }
    }, [index]);

    return (
        <div style={style}> 
            {!disabled ? 
            <div style={{overflow: "hidden", maxWidth: "50%", height: "100%", position: "absolute", left: "0"}}>
                <div 
                    style={{whiteSpace: "nowrap",
                    transition: "ease 1000ms",
                    transform: (index !== 0) ? `translate3d(${-index * 100}%, 0, 0)` : 'none'}}>
                    {images.map((image, index) => (
                        <div key={index} style={{ position: "relative", top: "20%", display: "inline-block", maxWidth: "100%", verticalAlign: "top"}}>
                            <img src={image.imgPath} alt={image.alt} loading="lazy" style={{minHeight: "100%", width: "100vh",
                                filter: "brightness(30%)",
                                objectFit: "cover"}}/>
                        </div>
                ))}
                </div>
        </div> : 
      <Box sx={{bgcolor: "primary.main", width:"40%", height: "100%", position: "absolute", left: "0"}} />}
    {!disabled && <Typography variant="subtitle2" color="white.main" sx={{zIndex: 2, position: "absolute", top: "95%", left: "3%"}}>via <a href={images[index].link} style={{color: "#A27B5C"}}>{images[index].attr}</a> @ Unsplash</Typography>}
    <Logo style={{zIndex: 1, 
        width: "25%", 
        display: "block", 
        height: "auto", 
        position: "absolute", 
        top: "25%", 
        left: disabled ? "5%" : "10%", 
        fill: "#DCD7C9"}}/>
      </div>
    )
}

export default Slideshow;