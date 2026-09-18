import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
    background: '#F2F3F4',
    animation: 'tlcFadeIn 280ms ease',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 8px 13px 8px',
      overflow: 'auto',
    },
  },
  welcome: {
    flexShrink: 0,
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
    flexShrink: 0,
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
    justifyContent: 'flex-start',
    background: '#FFFFFF',
    flex: '1 1 0',
    minWidth: 0,
    width: 'auto',
    height: '118px',
    borderRadius: '10px',
    gap: '16px',
    padding: '16px 18px',
    boxShadow: 'rgba(109, 109, 109, 0.25) 0px 4px 10px',
    textTransform: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    transition: 'transform 180ms ease, box-shadow 180ms ease',
    '& svg': {
      flexShrink: 0,
      width: '36px',
      height: '36px',
    },
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
      flex: '1 1 calc(50% - 10px)',
    },
    [theme.breakpoints.down('sm')]: {
      flex: '1 1 calc(50% - 5px)',
      gap: '12px',
      padding: '14px 12px',
    },
  },
  titleAndValue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '2px',
    minWidth: 0,
    flex: 1,
    '& .cardValue': {
      fontSize: '32px',
      fontWeight: '800',
      lineHeight: 1,
      letterSpacing: '-0.04em',
      fontVariantNumeric: 'tabular-nums',
      color: 'inherit',
      whiteSpace: 'nowrap',
    },
    '& .cardTitle': {
      fontSize: '12px',
      fontWeight: '600',
      color: '#5B6F56',
      lineHeight: 1.2,
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
    },
    '& .cardCta': {
      fontSize: '11px',
      fontWeight: '700',
      color: 'currentColor',
      marginTop: '4px',
    },
  },
  // big cards
  bigCardContainer: {
    display: 'flex',
    gap: '20px',
    flex: 1,
    minHeight: 0,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      overflow: 'auto',
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
