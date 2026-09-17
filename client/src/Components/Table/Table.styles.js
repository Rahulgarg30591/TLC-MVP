import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    fontSize: '14px !important',
  },
  verified: {
    color: theme.palette.primaryGreen,
    fontSize: '12px !important',
    width: '75px',
    textAlign: 'center',
    fontWeight: '500 !important',
  },
  pending: {
    '&.MuiButton-root': {
      textTransform: 'capitalize',
      fontSize: '12px',
      minWidth: '75px',
      borderRadius: '25px',
      padding: '0px',
      background: 'rgba(233,130,68,.2) !important',
      color: theme.palette.primaryOrange,
    },
  },
  tableSkeleton: {
    minHeight: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      color: theme.palette.primaryGreen,
    },
    '& .errorMessage': {
      color: '#6C6C6C',
      fontSize: '14px',
      fontWeight: '500',
    },
  },
  AgGridMain: {
    flex: 1,
    minHeight: 0,
    '& .ag-root-wrapper': {
      borderRadius: '0px',
    },
    '& .ag-header': {
      backgroundColor: '#FFFFFF',
      borderColor: theme.palette.primaryGreen,
      '& .ag-header-cell-text': {
        fontSize: '12px',
        color: '#2F2F2F',
        fontFamily: '"Inter", sans-serif',
        fontWeight: '500',
        cursor: 'pointer',
      },
      '& .ag-pinned-right-header': {
        borderLeft: '1px solid #C6C6C6',
      },
    },
    '& .ag-header-cell-resize': {
      right: '10px',
      '&::after': {
        background: '#C6C6C6',
        width: '1.5px',
      },
    },
    '& .ag-row': {
      borderColor: '#C6C6C6',
      transition: 'background-color 120ms ease',
    },
    '& .ag-row-hover': {
      backgroundColor: 'rgba(37, 147, 17, 0.14) !important',
      cursor: 'pointer',
    },

    '& .ag-cell': {
      fontSize: '12px',
      color: '#6C6C6C',
      fontWeight: '500',
      textTransform: 'capitalize',
      border: '1px solid transparent !important',
      fontFamily: '"Inter", sans-serif',
    },
    '& .ag-cell-focus': {
      borderColor: 'transparent',
    },

    '& .ag-overlay-wrapper': {
      paddingTop: '30px !important',
      fontSize: '12px',
      color: '#6C6C6C',
      fontWeight: '500',
    },

    '& .ag-checkbox-input-wrapper': {
      boxShadow: 'none !important',
      '&.ag-checked::after': {
        color: theme.palette.primaryGreen,
      },
      '&::after': {
        color: 'rgba(108,108,108, .5)',
      },
    },
    '& .ag-pinned-right-cols-container': {
      borderLeft: '1px solid #C6C6C6',
    },
  },
  count: {
    color: '#4e73be',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'color 160ms ease, text-decoration-color 160ms ease',
    '&:hover': {
      color: '#005C8E',
      textDecoration: 'underline',
    },
  },

  errorMessage: {
    color: '#6C6C6C',
    fontSize: '12px',
    fontWeight: '500',
  },

  nameLink: {
    color: '#005C8E',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    '&:hover': {
      color: '#259311',
    },
  },

  tableHint: {
    display: 'block',
    padding: '6px 12px',
    fontSize: '11px !important',
    fontWeight: '500 !important',
    color: '#6C6C6C',
    background: '#F7FBF5',
    borderBottom: '1px solid #DCEBD4',
  },

  // customHeaderText: {
  //   fontSize: '12px',
  //   color: '#2F2F2F',
  //   fontFamily: '"Inter", sans-serif',
  // },
}));
