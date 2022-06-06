import CssBaseline from '@material-ui/core/CssBaseline';
import StorageKeys from 'constants/storage-keys';
import CartFeature from 'features/Cart';
import { selectCartItems } from 'features/Cart/selectors';
import ProductFeature from 'features/Product';
import MainShoppingLayout from 'layouts/MainShoppingLayout';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';

function App() {
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    localStorage.setItem(StorageKeys.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="app">
        <MainShoppingLayout>
          <Switch>
            <Redirect from="/home" to="/" />

            <Route path="/" component={ProductFeature} exact />
            <Route path="/products" component={ProductFeature} />
            <Route path="/cart" component={CartFeature} />

            <Route component={NotFound} />
          </Switch>
        </MainShoppingLayout>
      </div>
    </React.Fragment>
  );
}

export default App;
