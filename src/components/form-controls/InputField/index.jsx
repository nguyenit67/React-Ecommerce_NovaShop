import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { getErrorMessageRHF } from 'utils';
import ErrorSharp from '@material-ui/icons/ErrorSharp';
import { useAuthFormFieldStyles } from 'components/styles';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default function InputField({ form, name, label, disabled }) {
  const classes = useAuthFormFieldStyles();
  const { hasError, errorMessage } = getErrorMessageRHF(form, name);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ onChange, onBlur, value, name }) => (
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          color="secondary"
          className={classes.root}
          label={label}
          disabled={disabled}
          // validation error
          error={hasError}
          helperText={
            hasError && (
              <>
                <ErrorSharp />
                {` ${errorMessage}`}
              </>
            )
          }
          // autoComplete="off"
          // below are `renders props` assigned to TextField's props
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
}
