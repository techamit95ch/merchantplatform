import React from 'react';
import logo from './logo.svg';
import ReactDOM, {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import AddProduct from './screens/addProduct';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route exact path="/add">
          <AddProduct/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
