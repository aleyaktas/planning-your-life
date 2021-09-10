import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarItem from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
import PrivateRoute from './components/route/PrivateRoute'
import Sidebar from './components/sidebar/Sidebar'
import Todos from './components/todo/Todos'
import Profile from './components/profile/Profile'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
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
        <Alert/>
        <Route exact path='/' component={Landing} /> 
        <PrivateRoute path='/todolist' component={Sidebar} />
        <Switch>
          
          <PrivateRoute path="/todolist/:id" component={Todos} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
        {/* <Route component={Landing}/> */}
      </Fragment>
      <ToastContainer />
    </Router> 
  </Provider>
  );
}

export default App;
