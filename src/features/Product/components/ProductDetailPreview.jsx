import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { addToCart } from 'features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import AddToCartForm from './AddToCartForm';
import ProductPreviewInfo from './ProductPreviewInfo';
import ProductThumbnail from './ProductThumbnail';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  addCart: {
    width: 151,
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

export default function ProductDetailPreview({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const match = useRouteMatch();
  // const { productId } = match.params;
  // const { product, loading } = useProductDetail(productId);

  // if (loading) {
  //   // TODO: Make this beautiful
  //   //      & better UX look
  //   // Option 1: use a Spinner or Loading, Progress component
  //   // Option 2: show a Skeleton indicate loading
  //   return (
  //     <Box className={classes.loading}>
  //       <LinearProgress />
  //     </Box>
  //   );
  // }

  const handleAddToCartSubmit = ({ quantity }) => {
    console.log(quantity, typeof quantity);
    // console.log('Add to cart submit', formValues);
    dispatch(
      addToCart({
        id: product.id,
        product,
        quantity,
      })
    );
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>

            <Grid item className={classes.right}>
              <ProductPreviewInfo
                product={product}
                // addToCartSlot={}
              />
              <Box className={classes.addCart}>
                <AddToCartForm onSubmit={handleAddToCartSubmit} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
