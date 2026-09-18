import { makeStyles } from '@mui/styles';
import { formPageShared } from '../../../styles/formPageShared';

export const useStyles = makeStyles((theme) => ({
  ...formPageShared(theme),
  autocomplete: {
    '& .MuiAutocomplete-endAdornment button': {
      padding: '0px',
      fontSize: '20px',
      '&:hover': {
        background: 'transparent',
      },
      '& svg': {
        color: '#2F2F2F',
        fontSize: '20px',
      },
      '& span': {
        display: 'none',
      },
    },
  },
  autocompleteTextField: {
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      paddingTop: '0px',
      paddingBottom: '0px',
      minHeight: '44px',
      '&.Mui-disabled': {
        '& .MuiAutocomplete-endAdornment svg': {
          color: '#696969',
        },
      },
    },
  },
  customAutocompleteDropdown: {
    '&.MuiPaper-rounded': {
      boxShadow: '0 12px 28px rgba(27, 59, 20, 0.12)',
      maxHeight: '220px',
      borderRadius: '12px',
    },
    '& ul': {
      maxHeight: '220px',
      padding: '6px 0px',
    },
    '& li': {
      padding: '8px 12px',
      fontSize: '14px',
      '&.MuiAutocomplete-option[aria-selected="true"]': {
        background: '#EAF6E6 !important',
      },
    },
  },
  notFound: {
    color: '#2F2F2F',
    fontSize: '12px !important',
  },
}));
