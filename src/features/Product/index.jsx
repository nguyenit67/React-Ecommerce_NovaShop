import { Box } from '@material-ui/core';
import ListPage from 'features/Product/pages/ListPage';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function ProductFeature(props) {
  const match = useRouteMatch();

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.path} exact component={ListPage} />
        {/* <Route path={match.path} component={ProductFeature} /> */}
      </Switch>
    </Box>
  );
}

export default ProductFeature;
