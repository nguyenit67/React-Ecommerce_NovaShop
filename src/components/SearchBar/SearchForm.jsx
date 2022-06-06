import { yupResolver } from '@hookform/resolvers/yup';
import { InputBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

/**
 * @typedef {import('@material-ui/core').ButtonProps} ButtonProps
 * @typedef {import('@material-ui/core').InputBaseProps} InputBaseProps
 *
 */

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

const SearchInput = withStyles((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px 0 0 4px',

    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 2),
    },
  },
}))((/** @type {InputBaseProps} */ props) => <InputBase aria-label="search" {...props} />);

const SearchSubmit = withStyles((theme) => ({
  root: {
    width: '80px',
    height: '100%',
    padding: theme.spacing(1),
    // backgroundColor: alpha(theme.palette.common.black, 0.15),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '0 4px 4px 0',

    '&, &:hover, &:focus': {
      boxShadow: 'none',
    },

    '&:hover': {
      // backgroundColor: alpha(theme.palette.common.black, 0.25),
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}))((/** @type {ButtonProps} */ props) => (
  <Button type="submit" variant="contained" {...props}>
    <SearchIcon />
  </Button>
));

export default function SearchForm({ onSubmit }) {
  const formSchema = yup.object().shape({
    search: yup.string().trim().required(),
  });
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Grid container alignItems="stretch">
        <SearchField name="search" form={form} placeholder="Search" />

        <SearchSubmit />
      </Grid>
    </form>
  );
}

function SearchField(props) {
  const { form, name, placeholder, disabled } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ onChange, onBlur, value, name }) => (
        <SearchInput
          // autoComplete="off"
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          disabled={disabled}
        />
      )}
    />
  );
}
