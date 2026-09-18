import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
  },
  main: {
    width: 'calc(100% - 16%)',
    height: 'calc(100vh - 64px)',
    height: 'calc(100dvh - 64px)',
    marginLeft: 'auto',
    marginTop: '64px',
    overflow: 'hidden',
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      flex: 1,
      minHeight: 0,
      height: '100%',
    },
    [theme.breakpoints.between('xs', 'md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      overflow: 'auto',
    },
  },
  notUser: {
    height: '100%',
    overflow: 'hidden',
    background: '#F3F6F1',
  },
}));
