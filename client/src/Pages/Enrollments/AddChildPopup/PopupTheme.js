import { createTheme } from '@mui/material';
import { Theme } from '../../../Theme';

export const ChildTheme = createTheme(Theme, {
  components: {
    MuiPopper: {
      styleOverrides: {
        root: {
          '@media (min-width: 960px)': {
            '&.MuiPickersPopper-root': {
              transform: 'none !important',
              left: '50% !important',
            },
          },
        },
      },
    },
  },

});
