import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo_v2.png';

const Navigation = ({hamburgerOpen,closeMenu}) => {

  const mobileNavigation = (
    <nav className="mobile-navbar">
          <ul className="mobile-list">
            <li>
              <Link onClick={closeMenu} to='/'>Dashboard</Link>
            </li>
            <li>
              <Link onClick={closeMenu} to='/orders'>Orders</Link>
            </li>
            <li>
              <Link onClick={closeMenu} to='/products'>Products</Link>
            </li>
            <li>
              <Link onClick={closeMenu} to='/'>Test</Link>
            </li>
            <li>
              <Link onClick={closeMenu} to='/'>Long Link Text</Link>
            </li>
          </ul>
      </nav>
  )

  return (
    <div className="">
       <nav className="custom-navbar d-none d-md-block">
        <div className="logo-title-wrapper d-flex">
          <img className="logo mr-2" src={Logo}></img> 
          <div className="title-wrapper">
            <Link to='/'>Hipicon</Link>
            <small className="text-white-50">Online Shopping</small>
          </div>
        </div>
        <div> 
          <ul className="list-wrapper">
            <li>
              <i className="fas fa-tachometer-alt"></i>
              <NavLink exact={true} to='/'>Dashboard</NavLink>
            </li>
            <li>
              <i className="fas fa-users"></i>
              <NavLink to='/orders'>Orders</NavLink>
            </li>
            <li>
              <i className="fas fa-users"></i>
              <NavLink to='/products'>Products</NavLink>
            </li>
            <li>
              <i className="fas fa-users"></i>
              <Link to='/'>Test</Link>
            </li>
            <li>
              <i className="fas fa-users"></i>
              <Link  to='/'>Long Link Text</Link>
            </li>
          </ul>
        </div>
      </nav>
      {hamburgerOpen ? mobileNavigation:''}
    </div>
     
  );
}

export default Navigation