import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
  },
  main: {
    width: 'calc(100% - 16%)',
    /* AppBar is 64px and position:fixed, so remaining viewport is 100vh - 64 */
    height: 'calc(100vh - 64px)',
    marginLeft: 'auto',
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    '& > *': {
      flex: 1,
      minHeight: 0,
      height: '100%',
    },
    [theme.breakpoints.between('xs', 'md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      minHeight: 'calc(100vh - 64px)',
    },
  },
  notUser: {
    minHeight: '100%',
    background: '#F3F6F1',
  },
}));
