import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

function Main(props) {
  return (
    <main className='main' >
      <Promo></Promo>
      <NavTab></NavTab>
      <AboutProject></AboutProject>
      <Techs></Techs>
    </main>
  )
}

export default Main;