import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    width: '100%',
    background: '#F2F3F4',
  },
  brandPanel: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '42%',
      padding: '48px',
      background: 'linear-gradient(165deg, #14570C 0%, #259311 58%, #4E73BE 140%)',
      color: '#FFFFFF',
      gap: '16px',
    },
  },
  brandLogo: {
    width: '140px',
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '12px',
    padding: '8px',
  },
  brandTitle: {
    fontSize: '32px !important',
    fontWeight: '700 !important',
    lineHeight: '1.2 !important',
  },
  brandCopy: {
    fontSize: '16px !important',
    fontWeight: '500 !important',
    maxWidth: '360px',
    opacity: 0.92,
  },
  formColumn: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    boxShadow: '0px 4px 10px rgba(109, 109, 109, 0.25)',
    [theme.breakpoints.between('sm', 'md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '50px 8px',
      width: '100%',
      boxShadow: 'none',
    },
  },
  logo: {
    width: '115px',
    objectFit: 'contain',
  },
  header: {
    fontSize: '14px !important',
    fontWeight: '500 !important',

    '& span': {
      color: '#259311',
      fontWeight: '600',
    },
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  formControl: {
    [theme.breakpoints.down('md')]: { width: '100%' },
    width: '359px',
    display: 'flex',
    gap: '5px',
    '& label': {
      fontWeight: '500',
      fontSize: '14px',
      color: '#2F2F2F',
      '& .MuiFormLabel-asterisk': {
        color: theme.palette.primaryRed,
      },
    },
    '& .MuiInputBase-formControl': {
      border: '1px solid #C6C6C6',
      borderRadius: '5px',
      height: '40px',
      paddingRight: '10px',
      backgroundColor: '#ffffff',
      transition: 'border-color 160ms ease, box-shadow 160ms ease',
      '& input': {
        fontSize: '14px',
        padding: ' 6px 10px',
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px white inset',
        },
      },
      '& fieldset': {
        display: 'none',
      },

      '& .MuiInputAdornment-root button': {
        padding: '0px',
        '& svg': {
          width: '20px',
          height: '20px',
          color: '#2F2F2F',
        },
      },
    },
  },

  FormElementInBox: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: { width: '100%' },
    width: '359px',
    gap: '10px',
    '& .forgotPassword , p': {
      fontSize: '12px',
      color: '#4E73BE',
      fontWeight: '500',
      textDecoration: 'none',
    },
    '& p': { color: '#2F2F2F' },
    '& .forgotPassword:hover, & .signup:hover': {
      textDecoration: 'underline',
    },
    '& .signup': {
      textDecoration: 'none',
      color: '#4E73BE',
    },
  },
  signInBtn: {
    height: '40px',
    width: '100%',
    borderRadius: '5px !important',
    textTransform: 'capitalize !important',
    backgroundColor: '#259311 !important',
    color: '#ffffff !important',
    fontWeight: '400 !important',
    '&.googleBtn': {
      color: '#4E73BE !important',
      backgroundColor: '#ffffff !important',
      border: '1.5px solid  #4E73BE !important',
      '&:hover': {
        [theme.breakpoints.up('md')]: {
          backgroundColor: '#4E73BE10 !important',
        },
      },
    },
    '&.continueBtn:hover': {
      [theme.breakpoints.up('md')]: {
        opacity: '.9',
      },
    },
  },
}));
