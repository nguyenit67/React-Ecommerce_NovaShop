import { TextField } from '@material-ui/core';

function PriceField(props) {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: PriceFormat,
      }}
    />
  );
}

export default PriceField;
