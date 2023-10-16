import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import {ReactComponent as Lasso} from '../assets/logos/lasso.svg';
import {ReactComponent as Wheel} from '../assets/logos/wheel.svg';
import {ReactComponent as Saloon} from '../assets/logos/saloon.svg';
import {ReactComponent as Wanted} from '../assets/logos/wanted.svg';
import {ReactComponent as Hat} from '../assets/logos/hat.svg';
import SVGFontButton from '../components/SVGFontButton';


function ElevationScroll(props) {
  // Navbar sticks to top with shadow
  const { children} = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

export default function Navbar({children, disabled}) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleSignOut = () => {
        handleClose();
        signOut(auth).then(() => {
            navigate("/");
        })
      }

      const handleMenuClick = (url) => {
        handleClose();
        navigate(url);
      }
  return (
    <Box>
        <Box sx={{ flexGrow: 1 }}>
        <ElevationScroll {...children}>
        <AppBar color="secondary">
            <Toolbar>
            <Box alignItems="center" sx={{ flexGrow: 1, display: "flex", justifyContent: "center"}}>
              <SVGFontButton
                disabled={disabled}
                onClick={() => navigate("/")}
                sx={{ml: "100px"}}
                iconPos="right"
                ariaLabel="home"
                size="70px"
                font="cowboy"
                icon={<Hat style={{width: "100px", height: "auto", fill: "white"}}/>}
              >
              Deputy Chef
              </SVGFontButton>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" }}}>
                <SVGFontButton
                  disabled={disabled}
                  onClick={() => navigate("/recipes")}
                  ariaLabel="my recipes"
                  size=""
                  font="wildwest"
                  icon={<Wanted style={{width: "65px", height: "auto", fill: "white"}}/>}
                >
                  My Recipes
                </SVGFontButton>
                <SVGFontButton
                  disabled={disabled}
                  onClick={() => navigate("/recipes/add")}
                  ariaLabel="add recipe"
                  size=""
                  font="wildwest"
                  icon={<Lasso style={{width: "80px", height: "auto", fill: "white"}}/>}
                >
                  Add Recipe
                </SVGFontButton>
                <SVGFontButton
                  disabled={disabled}
                  onClick={() => navigate("/mealplan")}
                  ariaLabel="meal plan"
                  size=""
                  font="wildwest"
                  icon={<Wheel style={{width: "90px", height: "auto", fill: "white"}}/>}
                >
                  Meal Plan
                </SVGFontButton>
                <SVGFontButton
                  disabled={disabled}
                  onClick={handleMenu}
                  ariaLabel="my account"
                  size=""
                  font="wildwest"
                  ariaHasPopup="true"
                  icon={<Saloon style={{width: "80px", height: "auto", fill: "white"}}/>}
                >
                  Settings
                </SVGFontButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                  <MenuItem onClick={() => handleMenuClick("/settings")}>Settings</MenuItem>
                  <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </AppBar>
        </ElevationScroll>
        </Box>
        <Box sx={{ display: "flex" }}>
            {children}
        </Box>
      </Box>
    )
}