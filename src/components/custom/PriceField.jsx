import { TextField } from '@material-ui/core';
import PriceFormat from './PriceFormat';

function PriceField(props) {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: PriceFormat,
      }}
      // variant="outlined"
    />
  );
}

export default PriceField;
