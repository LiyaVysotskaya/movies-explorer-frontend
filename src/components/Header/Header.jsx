import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' ? '' : 'header_white'}`}>
      <Link className='header__link-logo' to='/' ><img className="header__logo" src={logo} alt="Логотип диплома" /></Link>
      <Navigation loggedIn={props.loggedIn} pageName={props.pageName} />
    </header>
  );
}

export default Header;