import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';
import PropTypes from 'prop-types';

ProductPreviewInfo.propTypes = {
  product: PropTypes.object,
  addToCartSlot: PropTypes.any,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },

  description: {
    margin: theme.spacing(2, 0),
  },

  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  salePrice: {
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },
  promotionPercent: {},
}));

export default function ProductPreviewInfo({ product = {}, addToCartSlot }) {
  const classes = useStyles();
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>

            <Box component="span" className={classes.promotionPercent}>
              {`-${product.promotionPercent}%`}
            </Box>
          </>
        )}
      </Box>
      {addToCartSlot}
      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>
    </Box>
  );
}
