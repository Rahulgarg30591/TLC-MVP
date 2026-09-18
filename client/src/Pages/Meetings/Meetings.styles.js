import { makeStyles } from '@mui/styles';
import { actionButtons } from '../../styles/buttonShared';

export const useStyles = makeStyles((theme) => ({
  ...actionButtons(theme),
  root: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%',
    backgroundColor: '#F2F3F4',
    [theme.breakpoints.down('sm')]: {
      padding: '13px 8px',
    },
    '& .ag-theme-quartz': {
      '--ag-active-color': theme.palette.primaryGreen,
      height: '100%',
    },
  },

  HeadingAndActionBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h1': {
      fontSize: '22px',
      fontWeight: '700',
      height: 'auto',
      letterSpacing: '-0.02em',
    },
  },

  headerTablePagination: {
    boxShadow: '0 10px 28px rgba(31, 61, 20, 0.08)',
    borderRadius: '12px',
    overflowX: 'hidden',
    height: '100%',
    border: '1px solid #D5E6CE',
    background: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 94px)',
    },
  },
  tableContainer: {
    height: 'calc(100% - 108px)',
    overflow: 'auto',
    background: '#FFFFFF',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  tableHeader: {
    borderBottom: '1px solid #D5E6CE',
    background: '#F7FBF5',
    padding: '10px 16px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px',

    '& .MuiIconButton-root': {
      padding: '0px',
    },
  },
  // search bar
  searchbar: {
    flex: 1,
    maxWidth: '380px',
    '& .MuiInputBase-formControl': {
      border: '1px solid #D0DCCB',
      borderRadius: '24px',
      paddingRight: '10px',
      height: '36px',
      backgroundColor: '#ffffff',
      '& input': {
        fontSize: '13px',
        padding: '8px 4px',
      },
      '& fieldset': {
        display: 'none',
      },
    },
  },
  // modal
  filterRoot: {
    '& .MuiPaper-root': {
      padding: '0 8px',
      width: '200px',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px !important',
      borderRadius: '5px',
    },
  },
  filterContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: '#FFFFFF',
    gap: '10px',
    borderRadius: '5px',
    '&:focus': {
      outline: 'none',
    },
    '& p': {
      fontSize: '12px',
      fontWeight: '600',
    },
  },
  formControl: {
    width: '100%',
    display: 'flex',
    gap: '5px',

    '& label': {
      fontWeight: '500',
      fontSize: '12px',
      color: '#2F2F2F !important',
    },
    '& .MuiInputBase-formControl': {
      border: '1px solid #C6C6C6',
      borderRadius: '5px',
      paddingRight: '10px',
      height: '30px',
      backgroundColor: '#ffffff',
      '& input': {
        fontSize: '12px',
        padding: '6px 10px',
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px white inset',
        },
      },
      '& fieldset': {
        display: 'none',
      },

      '& .MuiInputAdornment-root button': {
        padding: '0px',
        margin: '0px',
        '& svg': {
          fontSize: '16px',
          color: '#2F2F2F',
        },
        '& .MuiTouchRipple-root': {
          display: 'none',
        },
      },
    },
  },

  filterIcon: {
    '&.MuiIconButton-root': {
      borderRadius: '18px',
      padding: '6px',
      height: '36px',
      width: '36px',
      border: '1px solid #D0DCCB',
      background: '#FFFFFF',
    },
  },
}));
