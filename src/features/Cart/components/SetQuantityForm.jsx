import { yupResolver } from '@hookform/resolvers/yup';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

SetQuantityForm.propTypes = {
  onSubmit: PropTypes.func,
};

function SetQuantityForm({ onSubmit = null, value: initialQuantity }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimum value is 1')
      .integer('Quantity must be a valid number')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    defaultValues: { quantity: initialQuantity },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const submitCallback = form.handleSubmit(handleFormSubmit);

  const quantity = form.watch('quantity');
  useEffect(() => {
    submitCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return (
    <form onSubmit={submitCallback}>
      <QuantityField name="quantity" form={form} />
    </form>
  );
}

export default SetQuantityForm;
