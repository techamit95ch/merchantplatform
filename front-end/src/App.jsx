import React from 'react';
import ReactDOM, {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import AddProduct from './screens/addProduct';
import ViewProduct from './screens/viewProducts';
function App() {
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
      </Switch>
    </Router>
  );
}

export default App;
