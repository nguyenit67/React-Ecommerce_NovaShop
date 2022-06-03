// @ts-ignore
import {
  Box,
  Button,
  FormHelperText,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { Add, Remove } from '@material-ui/icons';
import { MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY } from 'constants/index';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { numberParsePositiveInt, productQuantityClamp } from 'utils';
import { getErrorMessageRHF } from 'utils';

/**
 * @typedef {import('@material-ui/core').ButtonProps} ButtonProps
 */

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  inputGroup: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'stretch',
    minWidth: '135px',
    maxWidth: '200px',

    '& .MuiInputBase-root': {
      borderRadius: 0,
    },
  },
  left: {
    borderRadius: '50px 0 0 50px !important',
  },
  right: {
    borderRadius: '0 50px 50px 0 !important',
  },
  input: {
    textAlign: 'center',
  },
}));

const AdjustButton = withStyles({
  root: {
    borderRadius: 0,
    minWidth: 40,
    '& .MuiSvgIcon-root': {
      fontSize: 14,
    },
  },
})((/** @type {ButtonProps} */ props) => <Button variant="outlined" size="small" {...props} />);

export default function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const { setValue } = form;
  const { hasError, errorMessage } = getErrorMessageRHF(form, name);

  const addQuantity = (value, add) => {
    const newValue = numberParsePositiveInt(value) + add;
    form.setValue(name, newValue);
  };

  const updateValueOnBlur = (value) => {
    const parsedValue = numberParsePositiveInt(value);
    setValue(name, productQuantityClamp(parsedValue));
  };

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined" size="small">
      <Typography>{label}</Typography>

      <Controller
        name={name}
        control={form.control}
        render={({ onChange, onBlur, value, name }) => (
          <Box className={classes.inputGroup}>
            <AdjustButton
              className={classes.left}
              disabled={disabled || value <= MIN_PRODUCT_QUANTITY}
              onClick={() => addQuantity(value, -1)}
            >
              <Remove />
            </AdjustButton>

            <TextField
              variant="outlined"
              size="small"
              id={name}
              type="number"
              InputProps={{
                classes: {
                  input: classes.input,
                },
              }}
              disabled={disabled}
              // bind render props of Controller
              name={name}
              value={productQuantityClamp(value)}
              onChange={onChange}
              onBlur={() => updateValueOnBlur(value)}
            />

            <AdjustButton
              className={classes.right}
              disabled={disabled || value >= MAX_PRODUCT_QUANTITY}
              onClick={() => addQuantity(value, +1)}
            >
              <Add />
            </AdjustButton>
          </Box>
        )}
      />
      {/* validation error message */}
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
}
