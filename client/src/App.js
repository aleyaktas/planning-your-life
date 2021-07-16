import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavbarItem from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
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
      <Alert/> 
        <NavbarItem/>
           
        <Route exact path='/' component={Landing} />
          
      </Fragment>
    </Router> 
  </Provider>
  );
}

export default App;
