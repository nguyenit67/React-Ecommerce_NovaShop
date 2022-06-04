import { yupResolver } from '@hookform/resolvers/yup';
import { alpha, darken, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { Box, Input, InputBase } from '@material-ui/core';

/**
 * @typedef {import('@material-ui/core').ButtonProps} ButtonProps
 */

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

const SearchInput = withStyles((theme) => ({
  root: {
    flex: 1,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '4px 0 0 4px',

    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 2),
    },
  },
}))((props) => <InputBase placeholder="Tìm kiếm sản phẩm" {...props} />);

const SearchSubmit = withStyles((theme) => ({
  root: {
    width: '80px',
    height: '100%',
    color: '#fff',
    padding: theme.spacing(1),
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    borderRadius: '0 4px 4px 0',
    borderColor: '#fff',
    '&, &:hover, &:focus': {
      boxShadow: 'none',
    },

    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
  },
}))((/** @type {ButtonProps} */ props) => (
  <Button type="submit" variant="contained" {...props}>
    <SearchIcon />
  </Button>
));

export default function SearchForm({ onSubmit }) {
  const formSchema = object().shape({
    search: string().trim().required(),
  });
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  const handleFormSubmit = async (values) => {
    await onSubmit?.(values);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Grid container alignItems="center">
          <SearchInput />

          <SearchSubmit />
        </Grid>
      </form>
    </div>
  );
}
