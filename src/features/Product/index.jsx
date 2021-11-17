import { Box } from '@material-ui/core';
import ListPage from 'features/Product/pages/ListPage';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';

function ProductFeature(props) {
  const match = useRouteMatch();
  console.log('NLogging `match`', match);

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.path} exact component={ListPage} />
        <Route path={`${match.path}/:productId`} component={DetailPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
