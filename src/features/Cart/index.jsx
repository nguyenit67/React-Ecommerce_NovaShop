import React from 'react';
import PropTypes from 'prop-types';
import { addToCart } from './cartSlice';
import { useSelector } from 'react-redux';
import { selectCartTotal } from './selectors';

CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(selectCartTotal);

  return <div>Total: {cartTotal}</div>;
}

export default CartFeature;
