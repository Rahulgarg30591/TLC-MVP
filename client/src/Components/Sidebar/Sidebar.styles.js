import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDrawer-paper': {
      border: 'none',
      boxShadow: '0px 4px 5px 0px rgba(0, 0, 0, 0.25)',
      width: '16%',
      padding: '20px 10px',
      gap: '5px',
      [theme.breakpoints.down('sm')]: {
        width: '60%',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: '40%',
      },
    },
  },
  sideBarLinks: {
    padding: '0px !important',
    alignItems: 'flex-start !important',

    '& a': {
      padding: '10px 12px',
      gap: '15px',
      height: '42px',
      borderRadius: '8px',
      transition:
        'background-color 160ms ease, color 160ms ease, box-shadow 160ms ease',
      '&:hover': {
        backgroundColor: 'rgba(37,147,17,0.12)',
      },
    },
    '& .sidebarIcon': {
      minWidth: 'max-content',
    },
    '& .sidebarText': {
      '& span': {
        fontSize: '14px',
        fontWeight: '500',
      },
    },
  },
  navlink: {
    '&.active': {
      backgroundColor: '#259311',
      boxShadow: '0 4px 10px rgba(37, 147, 17, 0.28)',
      '& .sidebarText span': {
        color: '#FFFFFF',
        fontWeight: '700',
      },
      '& svg': {
        filter: 'brightness(0) invert(1)',
      },
    },
  },
}));
