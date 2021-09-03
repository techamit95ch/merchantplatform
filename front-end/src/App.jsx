import React, { useState, useEffect } from 'react';
import ReactDOM, {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import AddProduct from './screens/addProduct';
import ViewProduct from './screens/viewProducts';
import { getProducts } from './actions/products';
import { useDispatch, useSelector } from 'react-redux';
import Product from './screens/Product';
import Login from './screens/Login';
import Signin from './screens/Signin';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/add">
          <AddProduct />
        </Route>
        <Route exact path="/view">
          <ViewProduct />
        </Route>
        <Route exact path="/cart">
          <ViewProduct />
        </Route>
        <Route exact path="/product/:productId">
          <Product />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
