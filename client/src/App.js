import React, { Fragment } from 'react';
import './App.css';
import NavbarItem from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Fragment>
      <NavbarItem/>
      <Landing/>
    </Fragment>
  );
}

export default App;
