import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  Dialog: {
    '& .MuiDialog-paper': {
      boxShadow: '0 24px 60px rgba(27, 59, 20, 0.18)',
      borderRadius: '16px',
      width: '640px !important',
      maxWidth: '640px',
      overflow: 'hidden',
      animation: 'tlcSlideUp 360ms ease both',
      [theme.breakpoints.down('sm')]: {
        margin: '0px 8px !important',
      },
    },
  },
  TitleAndClose: {
    height: '56px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px !important',
    background: '#5a7030',
    '& p': {
      fontSize: '16px',
      fontWeight: '800',
      color: '#FFFFFF',
    },
  },
  CloseIcon: {
    padding: '0px !important',
    '& svg': {
      color: '#FFFFFF',
    },
  },
  DialogActions: {
    height: '56px',
    borderTop: '1px solid #e6dcc8',
    padding: '0 20px !important',
    gap: '12px',
    background: '#faf6ef',
    '& button': {
      height: '40px',
      padding: '0 16px',
      borderRadius: '10px',
      textTransform: 'none',
      fontSize: '13px',
      fontWeight: 700,
      minWidth: '92px !important',
      marginLeft: '0px !important',
    },
    '& .cancelBtn': {
      background: `${theme.palette.primaryGray} !important`,
      color: theme.palette.text.primary,
    },
    '& .inviteBtn': {
      background: `${theme.palette.primaryGreen} !important`,
      color: '#FFFFFF',
    },
  },
  DiaogContent: {
    padding: '22px 20px !important',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    background: '#FFFFFF',
  },
  formElementBox: {
    display: 'flex',
    gap: '16px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  formControl: {
    width: '100%',
    display: 'flex',
    gap: '6px',
    '& label': {
      fontWeight: '600',
      fontSize: '13px',
      color: '#2F2F2F !important',
      '& .MuiFormLabel-asterisk': {
        color: theme.palette.primaryRed,
      },
    },
    '& .MuiInputBase-formControl': {
      border: '1px solid #D5E0D0',
      borderRadius: '12px',
      paddingRight: '10px',
      height: '44px',
      backgroundColor: '#fffdf8',
      '& input': {
        fontSize: '14px',
        padding: '8px 12px',
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #fffdf8 inset',
        },
      },
      '& fieldset': {
        display: 'none',
      },
    },
  },
  selectBox: {
    fontSize: '14px !important',
    '& .MuiSelect-select': {
      paddingLeft: '12px !important',
    },
    '& svg': {
      color: '#2F2F2F',
      width: '20px',
      height: '20px',
    },
  },
  selectDropdownMenu: {
    boxShadow: '0 12px 28px rgba(27, 59, 20, 0.12) !important',
    maxHeight: '200px !important',
    borderRadius: '12px !important',
    '& ul': {
      padding: '6px 0px',
      '& li': {
        padding: '8px 12px',
        fontSize: '14px',
        '&.Mui-selected': {
          background: '#f2e8d8 !important',
        },
        '& span': {
          display: 'none',
        },
      },
    },
  },
}));
