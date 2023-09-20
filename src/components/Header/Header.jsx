import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const location = useLocation();

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function getMenu() {
    return isMenuOpen
      ? <button className='header__menu-button header__menu-button_close' onClick={closeMenu}></button>
      : <button className='header__menu-button header__menu-button_open' onClick={openMenu}></button>
  }

  // function getContent() {
  //   if (props.loggedIn) {
  //     return <></>
  //   } else {
  //     return (
  //       <nav>
  //         <ul className='header__link-container'>
  //           <li><Link className='header__link-signup' to='/signup'>Регистрация</Link></li>
  //           <li><Link className='header__link-signin' to='/signin'>Войти</Link></li>
  //         </ul>
  //       </nav>
  //     )
  //   }
    // if (props.loggedIn) {
    //   const userEmail = localStorage.getItem('useremail');
    //   return <>
    //     <div className={`header__login-container ${isMenuOpen && 'header__login-container_menu'}`} onClick={closeMenu} >
    //       <p className='header__email'>{userEmail}</p>
    //       <Link className={`header__link-action ${isMenuOpen && 'header__link-action_menu'}`} to='/sign-in' onClick={props.handleLogout} >Выйти</Link>
    //     </div>
    //   </>
    // } else {
    //   return location.pathname === '/sign-up'
    //     ? <Link className='header__link-action header__link-action_bright' to='/sign-in'>Регистрация</Link>
    //     : <Link className='header__link-action header__link-action_bright' to='/sign-up'>Войти</Link>
    //   }
    // }

  return (
    <header className={`header ${isMenuOpen && props.loggedIn && 'header_colomn'}`}>
      <div className='header__container'>
        <Link className='header__link-logo' to='/' ><img className="header__logo" src={logo} alt="Логотип диплома" /></Link>
        {props.loggedIn && getMenu()}
      </div>
      <Navigation loggedIn={props.loggedIn} />
    </header>
  );
}

export default Header;