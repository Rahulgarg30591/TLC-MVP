import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: '#FFFFFF !important',
    boxShadow: '4px 0px 5px 0px rgba(0, 0, 0, 0.25) !important',
    zIndex: '1300 !important',
    height: '64px !important',
    justifyContent: 'center',
    '& .toolbar': {
      padding: '0px 25px',
      justifyContent: 'space-between',
    },
  },

  logoAndHamburger: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    '& img': {
      width: '100px',
      height: '47px',
      objectFit: 'contain',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    '& .hamIconBtn': {
      padding: '0px',
    },
    '& svg': {
      color: '#2F2F2F',
    },
  },
  profile: {
    position: 'relative',
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '8px',
    padding: '4px 6px',
    transition: 'background-color 160ms ease',
    '&:hover': {
      backgroundColor: 'rgba(37, 147, 17, 0.08)',
    },
    '& .MuiAvatar-circular': {
      height: '30px',
      width: '30px',
      background: '#6C6C6C',
      fontSize: '12px',
      fontWeight: '600',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
  userNameAndUserRole: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',

    '& .userName, .userRole': {
      lineHeight: '12px',
      fontSize: '12px',
      fontWeight: '600',
    },
    '& .userRole': {
      color: '#6C6C6C',
    },
  },
  arrowProfileIcon: {
    height: '20px',
    width: '20px',
    '& svg': { color: '#2F2F2F', height: '20px', width: '20px' },
    '& span': {
      display: 'none',
    },
    '&:hover': {
      background: 'none !important',
    },
  },
  // profile dropdown
  profileDropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    zIndex: 20,
    width: '180px',
    padding: '6px 0',
    background: '#fffdf8',
    border: '1px solid #e6dcc8',
    borderRadius: '12px',
    boxShadow: '0 12px 28px rgba(61, 53, 37, 0.16)',
    fontFamily: theme.typography.fontFamily,
    '& a': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      color: '#3d3525',
      fontFamily: theme.typography.fontFamily,
      fontSize: '14px',
      fontWeight: 500,
      textDecoration: 'none',
      '&:hover': {
        backgroundColor: '#f2e8d8',
      },
      '& svg': {
        fontSize: '18px',
        color: '#3d3525',
      },
    },
  },
}));
