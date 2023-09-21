import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';
import accountLogo from '../../images/account-logo.svg';

function Navigation(props) {
  if (props.loggedIn) {
    return (
      <nav className="navigation">
        <ul className="navigation__list">
          <div className="navigation__film">
            <li><Link className="navigation__link" to='#'>Фильмы</Link></li>
            <li><Link className="navigation__link" to='#'>Сохранённые фильмы</Link></li>
          </div>
          <li>
            <Link className="navigation__link navigation__link_account" to='#'>Аккаунт
              <div className="navigation__logo-account"></div>
            </Link>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className="navigation">
        <ul className='navigation__unauthorized'>
          <li><Link className='navigation__link navigation__link_signup' to='/signup'>Регистрация</Link></li>
          <li><Link className='navigation__link navigation__link_signin' to='/signin'>Войти</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Navigation;