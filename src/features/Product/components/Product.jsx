import { Box, Dialog, DialogContent, makeStyles, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { formatPrice } from 'utils';
import ProductDetailPreview from './ProductDetailPreview';

Product.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    // transition: 'all 0.3s',

    '&:hover': {
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',

      '& img': {
        // transform: 'scale(1.1)',
        opacity: 0.9,
      },
    },
    '& a': {
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none',
    },
  },
  // thumbnail: {
  //   transition: 'all 0.3s ease-in-out',
  // },
}));

function Product({ product }) {
  // const history = useHistory();
  const classes = useStyles();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  const [open, setOpen] = useState(false);
  const productDetailUrl = `/products/${product.id}`;

  const handleClick = (event) => {
    // Navigate to detail page /products/:productId
    event.preventDefault();
    setOpen(true);
    window.history.pushState(null, `Sản phẩm ${product.name}`, productDetailUrl);
  };

  const handleClose = () => {
    setOpen(false);
    window.history.back();
  };

  return (
    <div>
      <Box padding={2} className={classes.root}>
        <RouterLink to={productDetailUrl} onClick={handleClick}>
          <Box minHeight="215px">
            <img src={thumbnailUrl} alt={product.name} width="100%" />
          </Box>

          <Typography variant="body2">{product.name} </Typography>
          <Typography variant="body2">
            <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
              {formatPrice(product.salePrice)}
            </Box>

            {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
          </Typography>
        </RouterLink>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <ProductDetailPreview product={product} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Product;
