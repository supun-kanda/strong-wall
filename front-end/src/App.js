import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import UserPortal from './components/User/UserPortal';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { URIs } from "./constants/constants";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path={URIs.HOME} exact />
          <PublicRoute restricted={true} component={UserPortal} path={URIs.AUTH} exact />
          <PrivateRoute component={Dashboard} path={URIs.DASHBOARD} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
