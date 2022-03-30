import { Box, Button, Divider, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import { selectCartTotal } from '../selectors';

CartCheckout.propTypes = {};

function CartCheckout(props) {
  const cartTotal = useSelector(selectCartTotal);

  return (
    <Box>
      <Paper>
        <Box p={1} display="flex" justifyContent="space-between">
          <Typography variant="body2">Tạm Tính</Typography>
          <Typography variant="body2">{formatPrice(cartTotal)}</Typography>
        </Box>
        <Divider />
        <Box p={1} display="flex" justifyContent="space-between">
          <Typography variant="body2">TỔNG TIỀN</Typography>
          <Typography variant="h5">{formatPrice(cartTotal)}</Typography>
        </Box>
      </Paper>

      <Button type="submit" variant="contained" color="primary" fullWidth size="large">
        THANH TOÁN
      </Button>
    </Box>
  );
}

export default CartCheckout;
