import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { debounce } from 'lodash'

import { SignOut } from '../store/modules/auth/auth.action';
//import Default from '../assets/default.png'

const Topbar = ({hamburgerClicked,hamburgerOpen,searchOnChange}) => {

  const [isOpen, setIsOpen] = useState(false); // For dropdown-menu

  const dispatch = useDispatch()

  const logoutUser  = () => dispatch(SignOut());

  const logout = (e) => {
    e.preventDefault()
    logoutUser()
  }

  const dropdownMenu = (
    <ul className="custom-dropdown-menu">
        <li className="custom-dropdown-item">
            <NavLink to="/">Profile</NavLink>
        </li>
        <li className="custom-dropdown-item">
            <a onClick={logout}>Logout</a>
        </li>
    </ul>
  )

  const handleSearchInput = (e) => {
      searchOnChange(e.target.value)
  }

  return (
  
      <div className="custom-topbar">
            <div className="divider"></div> 
            <div onClick={hamburgerClicked}
            className="hamburger-icon d-flex align-items-center mr-5 d-block d-md-none">
                {hamburgerOpen ? <i className="fas fa-times"></i>:<i className="fas fa-bars"></i>}
            </div>
            <div className="search-wrapper">
                <i className="fas fa-search"></i>
                <input onChange={debounce(handleSearchInput,500)} className="search-input pr-3" autoComplete="off" type="search" 
                name="search" placeholder="Search...    (payout:Paid)" />
            </div>
            <div className="divider"></div>
            <div className="dropdown-wrapper">
                <a onClick={() => setIsOpen(!isOpen)} className="wrapper dropdown-link d-flex align-items-center">
                    <div className="name-wrapper mr-3 d-flex flex-column">
                        <span className="text-white">Serhat Akbulut</span>
                        <small className="align-self-end text-white-50">Designer</small>
                    </div>
                    <i className="fas fa-chevron-down"  style={{color:'gray'}}></i>
                </a>
                { isOpen ? dropdownMenu : ''}
            </div>
      </div>
  );
}

export default Topbar