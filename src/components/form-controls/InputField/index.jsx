import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import useErrorRHF from '../../../utils/useErrorRHF';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { hasError, errorMessage } = useErrorRHF(form, name);

  return (
    <Controller
      name={name}
      control={form.control}
      as={TextField}
      // below is TextField's props
      fullWidth
      label={label}
      disabled={disabled}
      // validation error
      error={hasError}
      helperText={errorMessage}
      // my custom bonus
      autoComplete="off"
    />
  );
}

export default InputField;
