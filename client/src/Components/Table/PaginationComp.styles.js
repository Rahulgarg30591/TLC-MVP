import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    justifyContent: 'flex-end',
    height: '52px',
    background: '#F7FBF5',
    padding: '0 16px',
    borderTop: '1px solid #D5E6CE',
    '& .pageInfo': {
      minWidth: '92px',
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: '700',
      color: '#1B3B14',
      background: '#FFFFFF',
      border: '1px solid #D5E6CE',
      borderRadius: '999px',
      padding: '4px 12px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        minWidth: 'auto',
      },
    },
  },
  pageBtn: {
    '&.MuiIconButton-root': {
      padding: '6px',
      color: '#1B3B14',
      '&:hover': {
        backgroundColor: '#E5F3E0',
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
