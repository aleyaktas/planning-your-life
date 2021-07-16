import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavbarItem from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './store'

function App() {
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
