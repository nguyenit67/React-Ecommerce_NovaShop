import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import { Switch, useRouteMatch } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

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
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailPage() {
  const classes = useStyles();
  const match = useRouteMatch();
  const { productId } = match.params;

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    // TODO: Make this beautiful
    //      & better UX look
    // Option 1: use a Spinner or Loading, Progress component
    // Option 2: show a Skeleton indicate loading
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = (values) => {
    console.log('Add to cart submit', values);
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
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Paper elevation={0} style={{ padding: '30px' }}>
          <Switch>
            <Route exact path={match.url}>
              <ProductDescription product={product} />
            </Route>

            <Route exact path={`${match.url}/additional`}>
              <ProductAdditional product={product} />
            </Route>

            <Route exact path={`${match.url}/reviews`}>
              <ProductReviews product={product} />
            </Route>
          </Switch>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
