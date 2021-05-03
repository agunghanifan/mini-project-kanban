import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Login, Register, Dashboard, NotFound } from './pages/'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to ='/v1' />
        </Route>
        <Route exact path='/v1'>
          <Login />
        </Route>
        <Route path='/v1/register'>
          <Register />
        </Route>
        <Route path='/v1/dashboard'>
          <Dashboard />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
