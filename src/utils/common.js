export function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export function numberParsePositiveInt(string = '', defaultValue = 1) {
  const parsed = Number.parseInt(string);
  return parsed ? parsed : defaultValue;
}
