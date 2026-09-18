export const actionButtons = (theme) => ({
  ActionBtn: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      gap: '8px',
    },
    '& button': {
      height: '38px',
      minWidth: '88px',
      padding: '0 16px',
      borderRadius: '10px',
      textTransform: 'none',
      fontSize: '13px',
      fontWeight: 700,
      color: '#FFFFFF',
      letterSpacing: '-0.01em',
      boxShadow: 'none',
      [theme.breakpoints.down('sm')]: {
        minWidth: '78px',
      },
    },
    '& button.viewBtn': {
      background: `${theme.palette.primaryOrange} !important`,
    },
    '& button.deleteBtn': {
      background: `${theme.palette.primaryRed} !important`,
    },
    '& button.editBtn': {
      background: `${theme.palette.primaryBlue} !important`,
    },
    '& button.createEnrollBtn': {
      background: `${theme.palette.primaryGreen} !important`,
    },
    '& button.createWorkshopBtn': {
      background: `${theme.palette.primaryGreen} !important`,
    },
    '& button.createMeetingBtn': {
      background: `${theme.palette.primaryGreen} !important`,
    },
    '& button.inviteBtn': {
      background: `${theme.palette.primaryGreen} !important`,
    },
  },
  resetFilterBtn: {
    '&.MuiButton-root': {
      textTransform: 'none',
      fontSize: '13px',
      fontWeight: 700,
      height: '36px',
      borderRadius: '10px',
      padding: '0 14px',
      background: `${theme.palette.primaryBlue} !important`,
      color: '#FFFFFF',
    },
  },
});

export const dialogActionButtons = (theme) => ({
  height: '40px',
  minWidth: '92px',
  padding: '0 16px',
  borderRadius: '10px',
  textTransform: 'none',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '-0.01em',
  marginLeft: '0px !important',
});
