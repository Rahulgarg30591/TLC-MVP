import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: '#faf6ef',
    border: '1px solid #e6dcc8',
    borderRadius: '12px !important',
    boxShadow: 'none !important',
    '&::before': {
      background: 'transparent !important',
    },

    '& .MuiCollapse-vertical': {
      maxHeight: '300px',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },

    '& .accordianSummary': {
      minHeight: '40px !important',
      maxHeight: '40px !important ',
      padding: '0 10px !important',
      fontSize: '14px ',
      fontWeight: '500',
      textTransform: 'capitalize',
      '&.Mui-expanded': { borderBottom: '1px solid #e6dcc8' },

      '& svg': {
        color: '#5a7030',
        fontSize: '20px',
      },

      '& .MuiAccordionSummary-content': {
        margin: '0 ',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
  },

  accordionDetails: {
    backgroundColor: '#fff',
    padding: '0px !important',
    '& .ag-center-cols-viewport': {
      minHeight: '60px !important',
    },
    '& .ag-theme-quartz': {
      '--ag-active-color': 'transparent !important',
    },
  },

  //   ag grid table
  AgGridMain: {
    '& .ag-root-wrapper': {
      borderRadius: '0px',
      border: '0px',
    },
    '& .ag-header': {
      backgroundColor: '#fffdf8',
      borderColor: '#e6dcc8',
      '& .ag-header-cell-text': {
        fontSize: '14px',
        color: '#3d3525',
        fontFamily: theme.typography.fontFamily,
        fontWeight: '600',
      },
    },
    '& .ag-header-cell-resize': {
      right: '10px',
      '&::after': {
        background: '#e6dcc8',
        width: '1.5px',
      },
    },
    '& .ag-row': {
      borderColor: '#e6dcc8',
    },

    '& .ag-cell': {
      fontSize: '14px',
      color: '#3d3525',
      fontWeight: '500',
      textTransform: 'none',
      fontFamily: theme.typography.fontFamily,
    },
    '& .ag-cell-focus': {
      borderColor: 'transparent',
    },

    '& .ag-overlay-wrapper': {
      paddingTop: '30px !important',
      fontSize: '14px',
      fontFamily: theme.typography.fontFamily,
      color: '#6C6C6C',
      fontWeight: '500',
    },
  },
  DeletBtn: {
    '&.MuiIconButton-root': {
      padding: '0px',
      marginTop: '-5px',
    },
    '& svg': {
      fontSize: '20px',
      color: '#C1423F',
    },
  },
  BtnWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    height: '100%',
  },
  childActionBtn: {
    '&.MuiIconButton-root': {
      padding: '6px',
      borderRadius: '8px',
    },
    '& svg': {
      fontSize: '20px',
    },
    '&.childEditIcon': {
      color: theme.palette.primaryBlue,
    },
    '&.childDeleteIcon': {
      color: theme.palette.primaryRed,
    },
  },
}));
