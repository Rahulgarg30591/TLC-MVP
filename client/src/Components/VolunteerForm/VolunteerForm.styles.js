import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
  },
  formHeaderSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    borderRadius: '14px',
    border: '1px solid #E7EEE3',
    background: '#FBFDF9',
    '& .formIconAndHeader': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      paddingBottom: '8px',
      borderBottom: '1px solid #E7EEE3',
      '& p': {
        fontWeight: '700',
        fontSize: '12px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#3D5A36',
        lineHeight: 'normal',
      },
      '& svg': {
        width: '18px',
        height: '18px',
        color: '#259311',
      },
    },
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
      backgroundColor: '#FFFFFF',
      transition:
        'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
      '&:hover': {
        borderColor: '#B7CDB0',
      },
      '& input': {
        fontSize: '14px',
        padding: '8px 12px',
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
          width: '20px',
          height: '20px',
          color: '#2F2F2F',
        },
        '& .MuiTouchRipple-root': {
          display: 'none',
        },
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
      top: '25%',
    },
  },
  selectDropdownMenu: {
    boxShadow: '0 12px 28px rgba(27, 59, 20, 0.12) !important',
    maxHeight: '200px !important',
    borderRadius: '12px !important',
    [theme.breakpoints.down('sm')]: {
      transform: 'translateX(-8px) !important',
    },
    '& ul': {
      padding: '6px 0px',
      '& li': {
        padding: '8px 12px',
        fontSize: '14px',
        '&.Mui-selected': {
          background: '#EAF6E6 !important',
        },
        '& span': {
          display: 'none',
        },
      },
    },
    datepicker: {
      display: 'none !important',
    },
  },
  signUpBtn: {
    height: '46px',
    borderRadius: '12px !important',
    textTransform: 'none !important',
    backgroundColor: '#259311 !important',
    color: '#ffffff !important',
    fontWeight: '700 !important',
    fontSize: '15px !important',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '40%',
      height: '100%',
      background:
        'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)',
      animation: 'tlcShine 2.6s ease-in-out infinite',
    },
    '&:hover': {
      backgroundColor: '#1F7A12 !important',
      filter: 'none',
    },
  },
  signUpBtn_loginLink: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  borderClass: {
    border: '1px solid #D5E0D0',
    height: '44px',
    fontSize: '14px',
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    borderRadius: '12px',
    background: '#EEF2EB',
    color: '#696969',
  },
}));
