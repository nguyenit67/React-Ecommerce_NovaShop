import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ConfirmDialog from 'components/dialogs/ConfirmDialog';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatPrice } from 'utils';
import { removeFromCart, setQuantity } from '../cartSlice';
import SetQuantityForm from './SetQuantityForm';
import WarningIcon from '@material-ui/icons/Warning';

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',

    gap: 2,
  },

  thumbnail: {
    padding: theme.spacing(1.5),

    width: '7%',
    maxWidth: 80,
  },
  quantity: {
    justifySelf: 'end',
  },
  productTotal: {},
  remove: {},
}));

function CartItem({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, product, quantity } = item;
  const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const productDetailUrl = `/products/${id}`;
  const productTotal = product.salePrice * quantity;

  const handleSetQuantitySubmit = ({ quantity }) => {
    // console.log('CartItem handleSetQuantitySubmit', values);
    const newQuantity = quantity;
    dispatch(setQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveClick = () => {
    setOpenRemoveConfirm(true);
  };

  const handleRemoveOk = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      <Box className={classes.root} component={Paper} elevation={0} padding={1}>
        <Box className={classes.thumbnail} component={Link} to={productDetailUrl}>
          <img src={thumbnailUrl} alt={product.name} width="100%" />
        </Box>

        <Box>
          <Typography component={Link} to={productDetailUrl} variant="body2">
            {product.name}
          </Typography>
          <Typography variant="body2">
            <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
              {formatPrice(product.salePrice)}
            </Box>
          </Typography>
        </Box>

        <Box className={classes.quantity}>
          <SetQuantityForm value={quantity} onSubmit={handleSetQuantitySubmit} />
        </Box>

        <Box className={classes.productTotal}>
          <Typography variant="body1">{formatPrice(productTotal)}</Typography>
        </Box>

        <IconButton className={classes.remove} onClick={handleRemoveClick}>
          <Delete />
        </IconButton>
      </Box>

      <ConfirmDialog
        open={openRemoveConfirm}
        setOpen={setOpenRemoveConfirm}
        onConfirm={handleRemoveOk}
        title="⚠ Xoá sản phẩm"
      >
        Bạn có muốn xóa sản phẩm đang chọn?
      </ConfirmDialog>
    </div>
  );
}

export default CartItem;
