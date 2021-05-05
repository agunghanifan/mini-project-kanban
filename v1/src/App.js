import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Dashboard, NotFound } from './pages/'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to ='/v1' />
        </Route>
        <Route path='/v1'>
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
