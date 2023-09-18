import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <div className='navtab__basement'>
      <nav className='navtab__links'>
        <ul className='navtab__links-list'>
          <li className='navtab__links-item'><Link className='navtab__link' to='#'>О проекте</Link></li>
          <li className='navtab__links-item'><Link className='navtab__link' to='#'>Технологии</Link></li>
          <li className='navtab__links-item'><Link className='navtab__link' to='#'>Студент</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavTab;