import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimum value is 1')
      .integer('Quantity must be a valid number')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Box paddingY={2}>
        <Typography>Số Lượng</Typography>

        <Box>
          <QuantityField name="quantity" form={form} />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          style={{ width: '250px' }}
        >
          Chọn Mua
        </Button>
      </Box>
    </form>
  );
}

export default AddToCartForm;
