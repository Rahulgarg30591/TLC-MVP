import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    justifyContent: 'flex-end',
    height: '52px',
    flexShrink: 0,
    background: '#faf6ef',
    padding: '0 16px',
    borderTop: '1px solid #e6dcc8',
    '& .pageInfo': {
      minWidth: '92px',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '600',
      fontFamily: theme.typography.fontFamily,
      color: '#2a3814',
      background: '#FFFFFF',
      border: '1px solid #e6dcc8',
      borderRadius: '999px',
      padding: '4px 12px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        minWidth: 'auto',
      },
    },
  },
  pageBtn: {
    '&.MuiIconButton-root': {
      padding: '6px',
      color: '#2a3814',
      '&:hover': {
        backgroundColor: '#f2e8d8',
      },
      '&.Mui-disabled': {
        color: '#B7C4B3',
      },
      '& svg': {
        fontSize: '20px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '22px',
        },
      },
    },
  },
}));
