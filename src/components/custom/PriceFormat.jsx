import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const PriceFormat = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
        console.log('This log by inner onChange of NumberFormat', values);
      }}
      thousandSeparator="."
      decimalSeparator={false}
      isNumericString
      allowNegative={false}
    />
  );
});

PriceFormat.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PriceFormat;
