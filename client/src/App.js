import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavbarItem from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <Router>
    <Fragment>
      <NavbarItem/>
      <Route exact path='/' component={Landing} />
    </Fragment>
  </Router> 
  );
}

export default App;
