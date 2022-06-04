import { Button, FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { ErrorSharp } from '@material-ui/icons';
import { useAuthFormFieldStyles } from 'components/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { getErrorMessageRHF } from 'utils';

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default function PasswordField(props) {
  const classes = useAuthFormFieldStyles();
  const { form, name, label, disabled } = props;
  const { hasError, errorMessage } = getErrorMessageRHF(form, name);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((showPass) => !showPass);
  };

  return (
    <FormControl
      className={classes.root}
      fullWidth
      margin="normal"
      variant="outlined"
      color="secondary"
      error={hasError}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name }) => (
          <OutlinedInput
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  color="secondary"
                  // edge="end"
                >
                  {/* {showPassword ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />} */}
                  {/* {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />} */}
                  {/* <Typography color="secondary"></Typography> */}
                  {showPassword ? 'ẨN' : 'HIỆN'}
                </Button>
              </InputAdornment>
            }
            disabled={disabled}
            // bind render props of Controller to this component
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {/* validation error message */}
      <FormHelperText>
        {hasError && (
          <>
            <ErrorSharp />
            {` ${errorMessage}`}
          </>
        )}
      </FormHelperText>
    </FormControl>
  );
}
