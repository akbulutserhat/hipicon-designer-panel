import React , { useState } from 'react';
import { useSelector } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Topbar from './components/Topbar';
import Orders from './components/order/Orders';
import Products from './components/product/Products';
import { history } from './history'



const Routes  = () => {

  const [isOpen, setIsOpen] = useState(false); // For hamburger menu

  const [searchText, setSearchText] = useState();
  const [searchColumn, setSearchColumn] = useState();

  const authState = useSelector((state) => state.Auth)
  const { isAuthenticated } = authState;

  const searchOnChange = (value) => {
    let stringValue = value.toString()
      setSearchColumn(stringValue.slice(0,stringValue.indexOf(":")))
      setSearchText(stringValue.slice(stringValue.indexOf(":")+1))
  }

  const signedStyle = (
    <div className="wrapper d-flex">
          <Navigation closeMenu={() => setIsOpen(false)} hamburgerOpen={isOpen}></Navigation>
          <div className="wrapper d-flex flex-column">
            <Topbar hamburgerClicked={() => setIsOpen(!isOpen)} hamburgerOpen={isOpen} searchOnChange={searchOnChange}></Topbar>
            <div className="pages wrapper p-5 overflow-auto">
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/login' component={Login} />
                <Route path='/orders' render={(props) => (
                  <Orders {...props} searchColumn={searchColumn} searchText={searchText} />
                )} />
                 <Route path='/products' render={(props) => (
                  <Products {...props} searchColumn={searchColumn} searchText={searchText} />
                )} />
              </Switch>
            </div>
          </div>
         
        </div>
  )

  const signOutStyle = (
    <div className="pages container wrapper d-flex justify-content-center align-items-center">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='*' component={Login} />
      </Switch>
    </div>
  )
  
    return (
      <Router history={history}>
       { isAuthenticated ? signedStyle:signOutStyle }
      </Router>
      
    );
}

export default Routes;