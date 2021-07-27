import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarItem from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
import PrivateRoute from './components/route/PrivateRoute'
import Home from './components/home/Home'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './store'

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
  <Provider store={store} >
    <Router>
      <Fragment>
        <NavbarItem/>    
        <Route exact path='/' component={Landing} /> 
        <Alert/> 
        <section>
          <Switch>
            <PrivateRoute exact path="/home" component={Home}/>
          </Switch>
        </section> 
      </Fragment>
    </Router> 
  </Provider>
  );
}

export default App;
