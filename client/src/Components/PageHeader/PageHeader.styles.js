import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .pageHeading': {
      fontSize: '15px',
      fontWeight: '700',
      textTransform: 'capitalize',
      color: '#3D5A36',
    },
  },
  breadCrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    fontSize: '12px',
    fontWeight: '500',
    '& .navigationLink': {
      color: '#005C8E',
      textTransform: 'capitalize',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      transition: 'color 160ms ease',
      '&:hover': {
        textDecoration: 'underline',
        color: '#259311',
      },
    },
    '& svg': { fontSize: '20px', color: '#005C8E' },
    '& .currentPage': {
      fontSize: '12px',
      fontWeight: '500',
      color: '#6C6C6C',
      textTransform: 'capitalize',
    },
  },
}));
