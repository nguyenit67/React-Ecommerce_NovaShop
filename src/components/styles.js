import { makeStyles } from '@material-ui/core/styles';

export const useUserFormFieldStyles = makeStyles((theme) => ({
  root: {
    // '&, & .MuiOutlinedInput-root, & .MuiOutlinedInput-input': {   borderRadius: 2, },
    '& .MuiFormHelperText-root.Mui-error': {
      marginLeft: 0,
      '& .MuiSvgIcon-root': {
        fontSize: 12,
      },
    },

    '& .MuiFormLabel-root.Mui-error': {
      '&.MuiInputLabel-shrink, &.Mui-focused': {
        backgroundColor: '#fff',
        color: theme.palette.error.main,
      },
    },

    '& .MuiOutlinedInput-root.Mui-error': {
      '& > input': {
        backgroundColor: '#ffd8dd',
      },
      '&.Mui-focused > fieldset': {
        borderColor: theme.palette.error.main,
      },
    },
  },
}));

export const useAccountFormStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));
