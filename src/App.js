import Header from 'components/Header';
import StorageKeys from 'constants/storage-keys';
import CartFeature from 'features/Cart';
import ProductFeature from 'features/Product';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    localStorage.setItem(StorageKeys.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="app">
      <Header />

      {/* <p>
        <Link to="/todos">Todos</Link>
      </p>
      <p>
        <Link to="/albums">Albums</Link>
      </p> */}
      <Switch>
        <Redirect from="/home" to="/" />
        <Redirect from="/post-list/:postId" to="/posts/:postId" />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
