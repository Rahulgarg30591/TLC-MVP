import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100dvh',
    display: 'flex',
    width: '100%',
    alignItems: 'stretch',
    background: '#faf6ef',
  },
  panel: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '46%',
      minHeight: '100dvh',
      padding: '72px 64px',
      background:
        'linear-gradient(165deg, #3d4f1e 0%, #5a7030 62%, #6d8440 100%)',
      position: 'relative',
      overflow: 'hidden',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '280px',
      height: '280px',
      borderRadius: '50%',
      border: '1px solid rgba(201, 168, 74, 0.45)',
      right: '-80px',
      bottom: '-60px',
    },
  },
  eyebrow: {
    color: '#c9a84a !important',
    textTransform: 'uppercase',
    letterSpacing: '0.18em !important',
    fontWeight: '600 !important',
    marginBottom: '18px !important',
  },
  panelTitle: {
    maxWidth: '460px',
    color: '#faf6ef !important',
    fontWeight: '600 !important',
    lineHeight: '1.05 !important',
    marginBottom: '18px !important',
  },
  panelCopy: {
    maxWidth: '420px',
    color: '#f2e8d8 !important',
    lineHeight: '1.6 !important',
  },
  panelList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '28px',
  },
  panelItem: {
    color: '#faf6ef !important',
    paddingLeft: '16px',
    borderLeft: '2px solid #c9a84a',
  },
  formColumn: {
    flex: 1,
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    background:
      'linear-gradient(180deg, #faf6ef 0%, #f3eadc 100%)',
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    maxWidth: '440px',
    gap: '20px',
    padding: '40px 36px 32px',
    backgroundColor: '#fffdf8',
    borderRadius: '20px',
    border: '1px solid #e6dcc8',
    boxShadow: '0 18px 50px rgba(61, 79, 30, 0.08)',
    [theme.breakpoints.down('sm')]: {
      padding: '28px 18px 24px',
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  },
  logo: {
    width: '148px',
    alignSelf: 'center',
    objectFit: 'contain',
  },
  headingBlock: {
    textAlign: 'center',
  },
  welcome: {
    fontFamily: '"Cormorant Garamond", Georgia, serif !important',
    fontSize: '46px !important',
    fontWeight: '600 !important',
    color: '#3d4f1e',
    lineHeight: '0.95 !important',
  },
  header: {
    fontFamily: '"Libre Baskerville", Georgia, serif !important',
    fontSize: '13px !important',
    fontWeight: '400 !important',
    color: '#5a5040',
    marginTop: '10px !important',
    '& span': {
      color: '#3d4f1e',
      fontStyle: 'italic',
    },
  },
  formWrapper: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    width: '100%',
  },
  fieldIcon: {
    fontSize: '18px !important',
    color: '#8b9a70',
  },
  fieldHint: {
    fontSize: '12px !important',
    color: '#8b9a70',
    lineHeight: '1.4 !important',
  },
  formControl: {
    width: '100%',
    display: 'flex',
    gap: '6px',
    '& label': {
      fontWeight: '600',
      fontSize: '13px',
      color: '#3d3525',
      '& .MuiFormLabel-asterisk': {
        color: theme.palette.primaryRed,
      },
    },
    '& .MuiInputBase-formControl': {
      border: '1px solid #e0d5c3',
      borderRadius: '12px',
      height: '48px',
      paddingRight: '10px',
      paddingLeft: '6px',
      backgroundColor: '#fffdf8',
      '&:hover': {
        borderColor: '#c9a84a',
      },
      '& input': {
        fontSize: '15px',
        padding: '8px 8px',
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #fffdf8 inset',
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
          color: '#5a5040',
        },
      },
    },
  },
  FormElementInBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '8px',
    '& .forgotPassword': {
      alignSelf: 'flex-end',
      fontSize: '13px',
      color: '#a08040',
      fontWeight: '600',
      textDecoration: 'none',
    },
    '& .forgotPassword:hover, & .signup:hover': {
      textDecoration: 'underline',
    },
    '& p': {
      textAlign: 'center',
      color: '#5a5040',
      fontSize: '14px',
    },
    '& .signup': {
      textDecoration: 'none',
      color: '#3d4f1e',
      fontWeight: 700,
    },
  },
  signInBtn: {
    height: '48px',
    width: '100%',
    marginTop: '6px',
    borderRadius: '999px !important',
    textTransform: 'none !important',
    backgroundColor: '#5a7030 !important',
    color: '#faf6ef !important',
    fontWeight: '600 !important',
    fontSize: '15px !important',
    letterSpacing: '0.01em',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#3d4f1e !important',
    },
  },
}));
