import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy;2020</p>
        <nav className="footer__links">
          <Link className="footer__link">Яндекс.Практикум</Link>
          <Link className="footer__link">Github</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;