import { yupResolver } from '@hookform/resolvers/yup';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

CartQuantityForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default function CartQuantityForm({ onSubmit = null, value: initialQuantity }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimum value is 1')
      .integer('Quantity must be a valid number')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    mode: 'onTouched',
    defaultValues: { quantity: initialQuantity },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const submitCallback = form.handleSubmit(handleFormSubmit);

  return (
    <form onSubmit={submitCallback} onBlur={submitCallback}>
      <QuantityField name="quantity" form={form} submitCallback={submitCallback} />
    </form>
  );
}

// const quantity = form.watch('quantity');
// useEffect(() => {
//   submitCallback();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [quantity]);
