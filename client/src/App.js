import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarItem from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
import PrivateRoute from './components/route/PrivateRoute'
import Sidebar from './components/sidebar/Sidebar'
import Todos from './components/todo/Todos'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useSelector } from 'react-redux';
import store from './store'

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
 
  return (
  <Provider store={store} >
    <Router>
      <Fragment>
        <NavbarItem/>      
        <PrivateRoute path='/' component={Sidebar} />
        <Alert/>
        <Route exact path='/' component={Landing} /> 
        <Switch>
          <PrivateRoute exact path="/todolist/:id" component={Todos} />
        </Switch>
      </Fragment>
      <ToastContainer />
    </Router> 
  </Provider>
  );
}

export default App;
