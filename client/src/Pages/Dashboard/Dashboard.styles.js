import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: '#F2F3F4',
    animation: 'tlcFadeIn 280ms ease',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 8px 13px 8px',
    },
  },
  welcome: {
    background: 'linear-gradient(90deg, #1F7A12 0%, #259311 55%, #4E73BE 100%)',
    borderRadius: '10px',
    padding: '18px 22px',
    color: '#FFFFFF',
    boxShadow: '0 8px 18px rgba(37, 147, 17, 0.28)',
    '& .welcomeTitle': {
      fontSize: '20px',
      fontWeight: '700',
      lineHeight: 1.3,
    },
    '& .welcomeSub': {
      fontSize: '13px',
      fontWeight: '500',
      opacity: 0.92,
      marginTop: '4px',
    },
  },
  smallCardContainer: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.between('sm', 'md')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      gap: '10px',
    },
  },
  smallCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFFFFF',
    width: 'calc(100% / 4)',
    height: '118px',
    borderRadius: '10px',
    gap: '20px',
    boxShadow: 'rgba(109, 109, 109, 0.25) 0px 4px 10px',
    textTransform: 'capitalize',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    transition: 'transform 180ms ease, box-shadow 180ms ease',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '4px',
      background: 'currentColor',
      opacity: 0.85,
    },
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 22px rgba(109, 109, 109, 0.28)',
    },
    '&:active': {
      transform: 'translateY(-1px)',
    },

    '&.volunteer': {
      color: '#7EAA55',
      background: 'linear-gradient(180deg, #FFFFFF 50%, #F1F7EC 100%)',
    },
    '&.enrollment': {
      color: '#DF8244',
      background: 'linear-gradient(180deg, #FFFFFF 50%, #FBF3EC 100%)',
    },
    '&.meeting': {
      color: '#9580C5',
      background: 'linear-gradient(180deg, #FFFFFF 50%, #F4F1F9 100%)',
    },
    '&.workshop': {
      color: '#4E73BE',
      background: 'linear-gradient(180deg, #FFFFFF 50%, #EEF3FA 100%)',
    },
    '& hr': {
      alignSelf: 'center',
      height: '35px',
      borderColor: '#6C6C6C',
      borderWidth: '1px',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 'calc(50% - 10px)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      width: 'calc(50% - 5px)',
      gap: '15px',
    },
  },
  titleAndValue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    '& .cardValue': {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: 'normal',
    },
    '& .cardTitle': {
      fontSize: '12px',
      fontWeight: '500',
      color: '#6C6C6C',
      lineHeight: 'normal',
      textAlign: 'center',
    },
    '& .cardCta': {
      fontSize: '11px',
      fontWeight: '700',
      color: 'currentColor',
      marginTop: '2px',
    },
  },
  // big cards
  bigCardContainer: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 300px)',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  bigCard: {
    width: '50%',
    background: '#FFFFFF',
    boxShadow: 'rgba(109, 109, 109, 0.25) 0px 4px 10px',
    borderRadius: '5px',
    height: '100%',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '400px',
    },
    '& p.bigCardHeading': {
      fontWeight: '600',
      height: '30px',
    },
  },
  bigCardHeadingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '30px',
    '& .seeAll': {
      fontSize: '12px',
      fontWeight: '700',
      color: '#259311',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },

  upcominWorkshops: {
    height: 'calc(100% - 30px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '10px',
    gap: '15px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .noWorkshop, .upcomingLoading': {
      fontSize: '12px',
      fontWeight: '500',
    },
  },

  chartMain: {
    height: 'calc(100% - 30px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
