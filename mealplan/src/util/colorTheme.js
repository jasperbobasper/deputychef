import { createTheme } from '@mui/material/styles';
import '@fontsource/smokum';
import '@fontsource/blinker';
import '@fontsource-variable/alegreya';
import cowboy from '../assets/fonts/fonts'; 

const theme = createTheme({
  palette: {
    primary: {
        main: '#2C3639',
    }, 
    secondary: {
        main: '#A27B5C',
    },
    info: {
        main: '#3F4E4F',
    },
    background: {
        main: '#DCD7C9',
    },
    white: {
        main: '#FFFFFF',
    }
  },
  typography: {
    smokum: [
      'Smokum',
      'serif',
    ].join(','),
    fontFamily: [
        'Alegreya Variable', 
        'sans-serif',
    ].join(','),
    cowboy: [
        'Cowboy',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': [cowboy],
          },
        },
      },
});

export default theme;