import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { numberParsePositiveInt } from 'utils';
import useErrorRHF from '../../../utils/useErrorRHF';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '200px',
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { setValue } = form;
  const { hasError, errorMessage } = useErrorRHF(form, name);

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined" size="small">
      <Typography>{label}</Typography>

      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() => {
                const parsedValue = numberParsePositiveInt(value);
                if (parsedValue >= 2) {
                  setValue(name, parsedValue - 1);
                }
              }}
            >
              <RemoveCircleOutline />
            </IconButton>

            <OutlinedInput
              id={name}
              type="number"
              disabled={disabled}
              // bind render props of Controller to this component
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />

            <IconButton onClick={() => setValue(name, numberParsePositiveInt(value, 0) + 1)}>
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />
      {/* validation error message */}
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
}

export default QuantityField;
