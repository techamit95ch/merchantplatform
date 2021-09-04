import React, { useState, useEffect } from 'react';
import ReactDOM, {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import AddProduct from './screens/addProduct';
import ViewProduct from './screens/viewProducts';
import { getProducts } from './actions/products';
import { useDispatch, useSelector } from 'react-redux';
import Product from './screens/Product';
import Login from './screens/Login';
import Signin from './screens/Signin';
import { isLoggedIn } from './actions/auth';

function App() {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(isLoggedIn());
    setTimeout(() => {
      // await setSpinning(0);
      setReady(true);
    }, 200);
  }, [dispatch]);
  const user = useSelector((state) => state.auth);
  console.log(user);

  if (!ready) {
    return <></>;
  } else {
    if (user.success === false) {
      return (
        <>
          <Router>
            <Redirect to={'/login'} />
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signin">
                <Signin />
              </Route>
            </Switch>
          </Router>
        </>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeScreen />
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
  }
}

export default App;
