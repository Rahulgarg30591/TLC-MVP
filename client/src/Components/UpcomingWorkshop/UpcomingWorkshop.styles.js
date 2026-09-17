import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  workshop: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    cursor: 'pointer',
    borderRadius: '10px',
    padding: '10px 12px',
    outline: 'none',
    background: '#F7FBF5',
    border: '1px solid #DCEBD4',
    transition: 'background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
    '&:hover': {
      backgroundColor: '#EAF6E6',
      borderColor: '#259311',
      boxShadow: '0 4px 12px rgba(37, 147, 17, 0.16)',
    },
    '&:active': {
      transform: 'scale(0.995)',
    },
    '&:hover $card': {
      transform: 'scale(1.06)',
    },
    [theme.breakpoints.down("sm")]:{
     gap:"15px",
    },
  },

  card: {
    backgroundColor: '#7eaa55',
    minWidth: '60px',
    height: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderRadius: '5px',
    transition: 'transform 160ms ease',
    '& p': {
      fontWeight: '500',
      lineHeight: 'normal',
    },
  },
  titleAndInfo: {
    flex: 1,
    minWidth: 0,
    [theme.breakpoints.down("sm")]:{
      width:"100%",
    },
    '& .workshopTitle': {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '5px',
      lineHeight: '20px',
    },
  },
  Info: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.down("sm")]:{
      justifyContent:"space-between",
      gap:"0px"
    }
  },
  iconAndText: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    [theme.breakpoints.down("sm")]:{
      minWidth:"40%",
    },
    '& svg': {
      fontSize: '17px',
      color: '#6C6C6C',
    },
    '& .workshopText': {
      color: '#6C6C6C',
      fontSize: '12px',
      fontWeight: '500',
    },
  },
  chevron: {
    marginLeft: 'auto',
    color: '#259311',
    fontSize: '22px !important',
  },
}));
