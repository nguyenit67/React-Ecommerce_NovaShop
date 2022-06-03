export function formatCurrencyWithoutSign(number = 0, { locale = 'vi-VN', currency = 'VND' } = {}) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'code',
  })
    .format(number)
    .replace(currency, '')
    .trim();
}

export function formatCurrency(
  number = 0,
  { locale = 'vi-VN', currency = 'VND', displayType = 'default' } = {}
) {
  // let result = null;

  switch (displayType) {
    case 'shortVND': {
      const formattedNumber = formatCurrencyWithoutSign(number, {
        locale,
        currency,
      });
      const result = `${formattedNumber}đ`;
      return result;
    }

    default: {
      const defaultFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      });
      const result = defaultFormatter.format(number);
      return result;
    }
  }
}

export function formatPrice(number = 0, { locale = 'vi-VN', currency = 'VND' } = {}) {
  return formatCurrency(number, { locale, currency });
}

export function formatPriceShort(number = 0, { locale = 'vi-VN', currency = 'VND' } = {}) {
  return formatCurrency(number, {
    locale,
    currency,
    displayType: 'shortVND',
  });
}
