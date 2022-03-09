import React from 'react';
import PropTypes from 'prop-types';
import { addToCart } from './cartSlice';

CartFeature.propTypes = {};

function CartFeature(props) {
  const action = addToCart();
  console.log(action);

  return <div>Cart Feature</div>;
}

export default CartFeature;
