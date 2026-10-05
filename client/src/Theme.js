import { createTheme } from '@mui/material';

export const appFontFamily = 'Outfit, system-ui, sans-serif';

export const Theme = createTheme({
  typography: {
    fontFamily: appFontFamily,
    fontSize: 14,
    h1: { fontFamily: 'inherit', fontSize: 14, fontWeight: 600 },
    h2: { fontFamily: 'inherit', fontSize: 14, fontWeight: 600 },
    h3: { fontFamily: 'inherit', fontSize: 14, fontWeight: 600 },
    body1: { fontFamily: 'inherit', fontSize: 14 },
    body2: { fontFamily: 'inherit', fontSize: 14 },
    button: { fontFamily: 'inherit', fontSize: 14, textTransform: 'none' },
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
              borderColor: '#5a7030 !important',
              boxShadow: '0 0 0 3px rgba(90, 112, 48, 0.18)',
            },
          '& .ag-theme-quartz': {
            '--ag-font-family': appFontFamily,
            '--ag-font-size': '14px',
            fontFamily: appFontFamily,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          fontFamily: appFontFamily,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: appFontFamily,
          fontSize: 14,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: appFontFamily,
          fontSize: 14,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '-0.01em',
          borderRadius: '10px',
          minHeight: '38px',
          padding: '8px 16px',
          boxShadow: 'none',
          transition:
            'box-shadow 160ms ease, transform 120ms ease, opacity 160ms ease, background-color 160ms ease',
          '&:not(:disabled):hover': {
            filter: 'none',
            boxShadow: '0 8px 18px rgba(31, 61, 20, 0.16)',
            transform: 'translateY(-1px)',
          },
          '&:not(:disabled):active': {
            transform: 'translateY(0)',
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            opacity: 0.45,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 160ms ease, transform 120ms ease',
          '&:hover': {
            backgroundColor: 'rgba(90, 112, 48, 0.12)',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#5a7030',
      dark: '#3d4f1e',
      contrastText: '#faf6ef',
    },
    text: {
      primary: '#3d3525',
    },
    primaryGreen: '#5a7030',
    primaryRed: '#8C3A32',
    primaryBlue: '#8b9a70',
    primaryOrange: '#a08040',
    primaryGray: '#f2e8d8',
    background: {
      default: '#faf6ef',
      paper: '#fffdf8',
    },
  },
});
