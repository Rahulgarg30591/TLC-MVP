import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '18px',
  },
  ring: {
    width: '132px',
    height: '132px',
    borderRadius: '28px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 16px 40px rgba(37, 147, 17, 0.18)',
    animation: 'tlcPulseSoft 1.8s ease-in-out infinite',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '-6px',
      borderRadius: '32px',
      border: '3px solid transparent',
      borderTopColor: '#259311',
      borderRightColor: '#259311',
      animation: 'tlcSpin 0.9s linear infinite',
    },
  },
  logo: {
    width: '110px',
    height: 'auto',
    objectFit: 'contain',
    imageRendering: '-webkit-optimize-contrast',
    zIndex: 1,
  },
  label: {
    fontSize: '13px !important',
    fontWeight: '700 !important',
    letterSpacing: '0.16em !important',
    textTransform: 'uppercase',
    color: '#1F7A12',
    animation: 'tlcFadeIn 600ms ease both',
  },
  loaderRoot: {
    '&.MuiBackdrop-root': {
      zIndex: '1500',
      backgroundColor: '#F7FBF5',
    },
  },
  dashboardLoader: {
    '&.MuiBackdrop-root': {
      height: '100vh',
      width: 'calc(100vw - 16%)',
      marginLeft: '16%',
      backgroundColor: '#F7FBF5',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: '0px',
      },
    },
  },
}));
