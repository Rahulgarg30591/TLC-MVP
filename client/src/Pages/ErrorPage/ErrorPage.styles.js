import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    [theme.breakpoints.down('sm')]: {
      background: '#fff',
      marginTop: '50px',
    },
  },
  errorHeadingText: {
    textAlign: 'center',
    '& p': {
      lineHeight: 'normal',
      fontWeight: '500',
    },

    '& .errorHeading': {
      marginBottom: '10px',
      fontSize: '30px',
    },
    '& .errorText': {
      fontSize: '14px',
      fontWeight: '500',
      color: '#6C6C6C',
    },
  },
  errorBtn: {
    '&.MuiButton-root': {
      height: '40px',
      fontSize: '13px',
      textTransform: 'none',
      background: '#259311 !important',
      color: '#FFFFFF',
      fontWeight: '700',
      borderRadius: '10px',
      padding: '0 18px',
    },
  },
}));
