import { formatPrice, formatPriceShort } from 'utils/unitFormatters';

it('utils testing', () => {
  const priceNumber = 100000;
  const shortPrice = formatPriceShort(priceNumber);

  console.log({ shortPrice, longPrice: formatPrice(priceNumber) });

  expect(shortPrice).toEqual('100.000đ');
});
