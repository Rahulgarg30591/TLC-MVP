import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDrawer-paper': {
      border: 'none',
      boxShadow: '8px 0 24px rgba(27, 59, 20, 0.08)',
      width: '16%',
      padding: '12px 12px 16px',
      background: 'linear-gradient(180deg, #F3F9F0 0%, #FFFFFF 42%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        width: '72%',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: '42%',
      },
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 8px 16px',
    animation: 'tlcNavIn 420ms ease both',
  },
  brandLogo: {
    width: '36px',
    height: '36px',
    objectFit: 'contain',
    background: '#FFFFFF',
    borderRadius: '10px',
    padding: '4px',
    boxShadow: '0 2px 8px rgba(37, 147, 17, 0.16)',
  },
  brandName: {
    fontSize: '13px !important',
    fontWeight: '700 !important',
    color: '#1B3B14',
    lineHeight: '1.2 !important',
  },
  brandTag: {
    fontSize: '11px !important',
    fontWeight: '500 !important',
    color: '#6C8A64',
  },
  sectionLabel: {
    padding: '4px 12px 8px',
    fontSize: '10px !important',
    fontWeight: '700 !important',
    letterSpacing: '0.08em !important',
    textTransform: 'uppercase',
    color: '#7A9274',
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
  },
  sideBarLinks: {
    padding: '0px !important',
    alignItems: 'stretch !important',
    animation: 'tlcNavIn 420ms ease both',

    '& a': {
      padding: '8px 10px',
      gap: '12px',
      minHeight: '44px',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      transition:
        'background-color 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '8px',
        bottom: '8px',
        width: '3px',
        borderRadius: '0 3px 3px 0',
        background: 'transparent',
        transition: 'background-color 180ms ease, transform 180ms ease',
      },
      '&:hover': {
        backgroundColor: '#EAF6E6',
        transform: 'translateX(4px)',
      },
    },
    '& .sidebarIcon': {
      minWidth: '32px',
      width: '32px',
      height: '32px',
      borderRadius: '9px',
      background: '#E7F3E2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1F7A12',
      transition: 'transform 180ms ease, background-color 180ms ease',
      '& svg': {
        width: '16px',
        height: '16px',
      },
    },
    '& a:hover .sidebarIcon': {
      transform: 'scale(1.08)',
    },
    '& .sidebarText': {
      '& span': {
        fontSize: '13px',
        fontWeight: '600',
        color: '#2A4026',
      },
    },
  },
  navlink: {
    '&.active': {
      background: 'linear-gradient(90deg, #1F7A12 0%, #259311 100%)',
      boxShadow: '0 8px 18px rgba(37, 147, 17, 0.28)',
      transform: 'translateX(2px)',
      '&::before': {
        background: '#FFFFFF',
      },
      '& .sidebarText span': {
        color: '#FFFFFF',
        fontWeight: '700',
      },
      '& .sidebarIcon': {
        background: 'rgba(255,255,255,0.18)',
      },
      '& svg': {
        filter: 'brightness(0) invert(1)',
      },
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '12px',
    padding: '10px',
    borderRadius: '12px',
    background: '#F4F9F1',
    border: '1px solid #DCEBD4',
    animation: 'tlcNavIn 500ms ease both',
    animationDelay: '420ms',
  },
  footerAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#259311',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerMeta: {
    minWidth: 0,
    '& .name': {
      fontSize: '12px !important',
      fontWeight: '700 !important',
      color: '#1B3B14',
      lineHeight: '1.2 !important',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    '& .role': {
      fontSize: '11px !important',
      color: '#6C8A64',
      fontWeight: '500 !important',
    },
  },
}));
