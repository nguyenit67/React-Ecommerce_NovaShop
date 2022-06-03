import { Box, Container, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CartCheckout from './components/CartCheckout';
import CartList from './components/CartList';
import { selectCartItemsCount } from './selectors';

function CartFeature() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsCount = useSelector(selectCartItemsCount);
  // const cartTotal = useSelector(selectCartTotal);

  return (
    <Box pt={4}>
      <Container>
        <Typography component="h6">
          GIỎ HÀNG
          <Box component="span">({cartItemsCount} sản phẩm)</Box>
        </Typography>

        <Grid container spacing={2}>
          <Grid item md={9}>
            <CartList data={cartItems} />
          </Grid>

          <Grid item md={3}>
            <CartCheckout />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CartFeature;
