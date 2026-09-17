import { createTheme } from '@mui/material';

export const Theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '&::-webkit-scrollbar': {
            display: 'none',
          },

          '& .MuiPickersPopper-paper': {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          },

          '& a': {
            transition: 'color 160ms ease, background-color 160ms ease',
          },

          '& .MuiInputBase-formControl': {
            transition:
              'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
          },
          '& .MuiInputBase-formControl.Mui-focused, & .MuiInputBase-formControl:focus-within':
            {
              borderColor: '#259311 !important',
              boxShadow: '0 0 0 3px rgba(37, 147, 17, 0.14)',
            },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition:
            'filter 160ms ease, box-shadow 160ms ease, transform 120ms ease, opacity 160ms ease',
          '&:not(:disabled):hover': {
            filter: 'brightness(0.92)',
          },
          '&:not(:disabled):active': {
            transform: 'translateY(1px)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 160ms ease, transform 120ms ease',
          '&:hover': {
            backgroundColor: 'rgba(37, 147, 17, 0.08)',
          },
        },
      },
    },
  },
  palette: {
    text: {
      primary: '#2F2F2F',
    },
    primaryGreen: '#259311',
    primaryRed: '#C1423F',
    primaryBlue: '#005C8E',
    primaryOrange: '#DF6D10',
    primaryGray: '#E6E6E6',
  },
});
