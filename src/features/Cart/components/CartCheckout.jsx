import { Box, Button, Divider, Paper, Typography, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import { selectCartTotal } from '../selectors';
// import { makeStyles } from '@material-ui/core';

CartCheckout.propTypes = {};

// usestyle
const useStyles = makeStyles((theme) => ({
  root: {},
  submit: {
    marginTop: theme.spacing(3),
  },
}));

function CartCheckout(props) {
  const classes = useStyles();
  const cartTotal = useSelector(selectCartTotal);

  return (
    <Box className={classes.root}>
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

      <Button
        className={classes.submit}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        THANH TOÁN
      </Button>
    </Box>
  );
}

export default CartCheckout;
