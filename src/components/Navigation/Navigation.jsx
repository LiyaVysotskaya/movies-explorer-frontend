import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';
import accountLogo from '../../images/account-logo.svg';

function Navigation(props) {
  if (props.loggedIn) {
    return (
      <nav className="navigation">
        <ul className="navigation__list">
          <li><Link className="navigation__link" to='#'>Фильмы</Link></li>
          <li><Link className="navigation__link" to='#'>Сохранённые фильмы</Link></li>
          <li>
            <Link className="navigation__link" to='#'>Аккаунт
              <img className="navigation__logo-account" alt="Ссылка на личный кабинет" src={accountLogo} />
            </Link>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className="navigation">
        <ul className='navigation__unauthorized'>
          <li><Link className='navigation__link-signup' to='/signup'>Регистрация</Link></li>
          <li><Link className='navigation__link-signin' to='/signin'>Войти</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Navigation;