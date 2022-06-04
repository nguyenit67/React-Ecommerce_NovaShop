import { Box } from '@material-ui/core';
import ListPage from 'features/Product/pages/ListPage';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';

function ProductFeature() {
  const match = useRouteMatch();

  return (
    // @ts-ignore
    <Box pt={2.5}>
      <Switch>
        <Route path={match.path} exact component={ListPage} />
        <Route path={`${match.path}/:productId`} component={DetailPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
