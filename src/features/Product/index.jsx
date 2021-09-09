import ListPage from 'features/Product/pages/ListPage';
import React from 'react';
import { Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Route } from 'react-router-dom';

function ProductFeature(props) {
  const match = useRouteMatch();

  return (
    <div>
      Product Page
      <Switch>
        <Route path={match.path} exact component={ListPage} />
        {/* <Route path={match.path} component={ProductFeature} /> */}
      </Switch>
    </div>
  );
}

export default ProductFeature;
