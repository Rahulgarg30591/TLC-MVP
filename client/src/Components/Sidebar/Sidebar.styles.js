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
      padding: '10px',
      gap: '15px',
      height: '35px',
      borderRadius: '5px',
      borderLeft: '3px solid transparent',
      transition:
        'background-color 160ms ease, border-color 160ms ease, padding 160ms ease',
      '&:hover': {
        backgroundColor: 'rgba(37,147,17,0.10)',
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
      backgroundColor: 'rgba(37,147,17,0.14)',
      borderLeft: '3px solid #259311',
      '& .sidebarText span': {
        color: '#259311',
        fontWeight: '600',
      },
    },
  },
}));
