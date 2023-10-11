import React from 'react';
// import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <div className='navtab'>
      <nav className='navtab__links'>
        <ul className='navtab__links-list'>
          <li className='navtab__links-item'><a className='navtab__link' href='#about'>О проекте</a></li>
          <li className='navtab__links-item'><a className='navtab__link' href='#techs'>Технологии</a></li>
          <li className='navtab__links-item'><a className='navtab__link' href='#me'>Студент</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavTab;