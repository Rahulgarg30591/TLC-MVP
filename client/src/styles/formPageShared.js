export const formPageShared = (theme) => ({
  root: {
    height: '100%',
    minHeight: 0,
    position: 'relative',
    background: '#F3F6F1',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  HeaderMainContent: {
    padding: '16px 24px 16px',
    /* remaining height after the 56px action bar */
    height: 'calc(100% - 56px)',
    minHeight: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    animation: 'tlcFadeIn 280ms ease',
    [theme.breakpoints.down('sm')]: {
      padding: '12px',
    },
  },
  pageIntro: {
    background: 'linear-gradient(90deg, #1F7A12 0%, #259311 70%)',
    color: '#FFFFFF',
    borderRadius: '14px',
    padding: '16px 20px',
    boxShadow: '0 10px 24px rgba(37, 147, 17, 0.22)',
    '& .introTitle': {
      fontSize: '18px',
      fontWeight: '800',
      letterSpacing: '-0.02em',
    },
    '& .introSub': {
      fontSize: '13px',
      fontWeight: '500',
      opacity: 0.92,
      marginTop: '2px',
    },
  },
  actionBar: {
    background: '#FFFFFF',
    position: 'relative',
    flexShrink: 0,
    height: '56px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 24px',
    gap: '12px',
    borderTop: '1px solid #D5E6CE',
    boxShadow: '0 -8px 24px rgba(27, 59, 20, 0.06)',
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      boxShadow: 'none',
      background: 'none',
      justifyContent: 'flex-start',
      padding: '10px',
    },
    '& button': {
      height: '40px',
      minWidth: '92px',
      padding: '0 16px',
      borderRadius: '10px',
      textTransform: 'none',
      fontSize: '13px',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    '& button.cancelBtn, & .cancelBtn': {
      background: `${theme.palette.primaryGray} !important`,
      color: `${theme.palette.text.primary} !important`,
    },
    '& button.saveBtn, & .saveBtn': {
      background: `${theme.palette.primaryGreen} !important`,
    },
    '& button.editBtn, & .editBtn': {
      background: `${theme.palette.primaryBlue} !important`,
    },
  },
  mainContent: {
    width: '100%',
    maxWidth: '920px',
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
    marginBottom: '12px',
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '22px 24px',
    border: '1px solid #D5E6CE',
    boxShadow: '0 12px 32px rgba(27, 59, 20, 0.07)',
    animation: 'tlcSlideUp 420ms ease both',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '16px',
      gap: '18px',
    },
    '& p.heading': {
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#3D5A36',
      paddingBottom: '8px',
      borderBottom: '1px solid #E7EEE3',
    },
  },
  HeadingAndElementBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  formElementBox: {
    display: 'flex',
    gap: '16px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '14px',
    },
  },
  formControl: {
    width: '100%',
    display: 'flex',
    gap: '6px',
    '& label, & label.MuiFormLabel-root': {
      fontWeight: '600',
      fontSize: '13px',
      color: '#2F2F2F !important',
      '& .MuiFormLabel-asterisk': {
        color: theme.palette.primaryRed,
      },
    },
    '& .MuiInputBase-formControl': {
      border: '1px solid #D5E0D0',
      borderRadius: '12px',
      paddingRight: '10px',
      height: '44px',
      backgroundColor: '#FBFDF9',
      transition:
        'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
      '&:hover': {
        borderColor: '#B7CDB0',
        backgroundColor: '#FFFFFF',
      },
      '& input': {
        fontSize: '14px',
        padding: '8px 12px',
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px #FBFDF9 inset',
        },
      },
      '& fieldset': {
        display: 'none',
      },
      '& .MuiInputAdornment-root button': {
        padding: '0px',
        margin: '0px',
        '& svg': {
          width: '20px',
          height: '20px',
          color: '#2F2F2F',
        },
        '& .MuiTouchRipple-root': {
          display: 'none',
        },
      },
      '&.Mui-disabled': {
        background: '#EEF2EB !important',
        '& input.Mui-disabled': {
          '-webkit-text-fill-color': '#696969',
        },
        '& .MuiInputAdornment-root button svg': {
          color: '#696969',
        },
      },
    },
  },
  selectBox: {
    fontSize: '14px !important',
    '&.MuiInputBase-root': {
      fontSize: '14px',
      '& .MuiSelect-select': {
        paddingLeft: '12px',
      },
    },
    '& .MuiSelect-select': {
      paddingLeft: '12px !important',
    },
    '& svg': {
      color: '#2F2F2F',
      width: '20px',
      height: '20px',
      top: '25%',
    },
  },
  selectDropdownMenu: {
    boxShadow: '0 12px 28px rgba(27, 59, 20, 0.12) !important',
    maxHeight: '220px !important',
    borderRadius: '12px !important',
    '&.MuiPaper-root': {
      maxHeight: '220px',
      borderRadius: '12px',
      boxShadow: '0 12px 28px rgba(27, 59, 20, 0.12)',
    },
    [theme.breakpoints.down('sm')]: {
      transform: 'translateX(-6px) !important',
    },
    '& ul': {
      padding: '6px 0px',
      '& li': {
        padding: '8px 12px',
        fontSize: '14px',
        '&.Mui-selected, &.MuiMenuItem-root.Mui-selected': {
          background: '#EAF6E6 !important',
        },
        '& span': {
          display: 'none',
        },
      },
    },
  },
  HeaderAndAccordionBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  HeaderAndBtn: {
    minHeight: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& p': {
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#3D5A36',
    },
  },
  addBtn: {
    '&.MuiButtonBase-root': {
      minWidth: '88px',
      height: '34px',
      padding: '0 14px',
      borderRadius: '999px',
      textTransform: 'none',
      fontSize: '13px',
      fontWeight: 700,
      background: `${theme.palette.primaryGreen} !important`,
      color: '#ffffff',
    },
  },
  AccordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  workshopHistory: {
    '& .historyHeading': {
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#3D5A36',
      marginBottom: '12px',
    },
  },
  VolunteerHistory: {
    '& .historyHeading': {
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#3D5A36',
      marginBottom: '12px',
    },
  },
  loader: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F6F1',
    '& svg': {
      color: theme.palette.primaryGreen,
    },
    '& .errorMessage': {
      color: '#6C6C6C',
      fontSize: '14px',
      fontWeight: '500',
    },
  },
});
