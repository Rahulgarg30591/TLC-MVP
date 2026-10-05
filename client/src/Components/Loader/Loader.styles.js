import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '28px 32px',
    background: '#FFFFFF',
    borderRadius: '20px',
    border: '1px solid #DCEBD4',
    boxShadow: '0 18px 50px rgba(27, 59, 20, 0.12)',
    animation: 'tlcSlideUp 360ms ease both',
    '&.compact': {
      padding: 0,
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
      gap: '12px',
    },
  },
  logo: {
    width: '168px',
    height: 'auto',
    objectFit: 'contain',
    imageRendering: '-webkit-optimize-contrast',
    animation: 'tlcLogoBreathe 1.8s ease-in-out infinite',
  },
  track: {
    width: '168px',
    height: '3px',
    borderRadius: '999px',
    background: '#E3F0DE',
    overflow: 'hidden',
    position: 'relative',
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '40%',
    borderRadius: '999px',
    background: '#5a7030',
    animation: 'tlcBar 1.1s ease-in-out infinite',
  },
  label: {
    fontSize: '13px !important',
    fontWeight: '600 !important',
    color: '#3d4f1e',
    letterSpacing: '0.01em !important',
  },
  loaderRoot: {
    '&.MuiBackdrop-root': {
      zIndex: '1500',
      backgroundColor: 'rgba(243, 246, 241, 0.92)',
      backdropFilter: 'blur(6px)',
    },
  },
  dashboardLoader: {
    '&.MuiBackdrop-root': {
      height: '100vh',
      width: 'calc(100vw - 16%)',
      marginLeft: '16%',
      backgroundColor: 'rgba(243, 246, 241, 0.92)',
      backdropFilter: 'blur(6px)',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: '0px',
      },
    },
  },
}));
