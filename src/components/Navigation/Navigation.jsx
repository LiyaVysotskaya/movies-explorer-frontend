import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Navigation.css';

function Navigation(props) {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
      setMenuOpen(false);
    }

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);


  function onMenuClick() {
    setMenuOpen(x => !x);
  }

  if (props.loggedIn) {
    return <>
      <button className={`navigation__menu-button navigation__menu-button_${isMenuOpen ? "close" : "open"}`} onClick={onMenuClick}></button>
      {(width >= 1024 || isMenuOpen) &&
        <nav className="navigation">
          <ul className="navigation__list">
            {width < 1024 && <li className="navigation__element"><Link className="navigation__link" to='/' target="blank">Главная</Link></li>}
            <li className="navigation__element"><Link className="navigation__link" to='/movies' target="blank">Фильмы</Link></li>
            <li className="navigation__element"><Link className="navigation__link" to='/saved-movies' target="blank">Сохранённые фильмы</Link></li>
            <li className="navigation__element">
              <Link className="navigation__link navigation__link_account" to='/profile' target="blank">Аккаунт
                <div className={`navigation__logo-account ${location.pathname === '/' ? '' : 'navigation__logo-account_white'}`}></div>
              </Link>
            </li>
          </ul>
        </nav>
      }
    </>
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