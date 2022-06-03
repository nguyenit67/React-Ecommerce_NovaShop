import { MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY } from 'constants/common';

export function getErrorMessageRHF(form, name) {
  const { errors } = form;
  const hasError = errors[name]; /* && formState.touched[name]; */
  const errorMessage = errors[name]?.message;

  return {
    hasError: !!hasError,
    errorMessage,
  };
}

export const styledBy = (property, mapping) => (props) => mapping[props[property]];

export const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

export const productQuantityClamp = (value) =>
  clamp(value, MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY);

export function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export function numberParsePositiveInt(string = '', defaultValue = 1) {
  const parsed = Number.parseInt(string);
  return parsed ? parsed : defaultValue;
}
