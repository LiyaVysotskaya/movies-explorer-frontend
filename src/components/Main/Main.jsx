import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';

function Main(props) {
  return (
    <main className='main' >
      <Promo></Promo>
      <NavTab></NavTab>
    </main>
  )
}

export default Main;