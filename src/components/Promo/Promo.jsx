import React from 'react';
import './Promo.css';
import landingLogo from '../../images/landing-logo.png';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <img className='promo__logo' alt='Логотип лэндинга' src={landingLogo}></img>
      </div>

    </section>
  )
}

export default Promo;