import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Navigation.css';

function Navigation(props) {
  const location = useLocation();

  if (props.loggedIn) {
    if (window.innerWidth > 1023) {
      return (
        <nav className="navigation">
          <ul className="navigation__list">
            <div className="navigation__film">
              <li><Link className="navigation__link" to='/movies' target="blank">Фильмы</Link></li>
              <li><Link className="navigation__link" to='/saved-movies' target="blank">Сохранённые фильмы</Link></li>
            </div>
            <li>
              <Link className="navigation__link navigation__link_account" to='/profile' target="blank">Аккаунт
                <div className={`navigation__logo-account ${location.pathname==='/' ? '' : 'navigation__logo-account_white'}`}></div>
              </Link>
            </li>
          </ul>
        </nav>
      )
    }
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