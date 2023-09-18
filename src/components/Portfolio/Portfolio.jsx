import React from "react";
import { Link } from "react-router-dom";
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <nav className="portfolio__links">
        <ul className="portfolio__links-list">
          <li className="portfolio__element">
            <Link className="portfolio__link" to='#'>
              Статичный сайт
              <button className="portfolio__button"></button>
            </Link>
          </li>
          <li className="portfolio__element">
            <Link className="portfolio__link" to='#'>
              Адаптивный сайт
              <button className="portfolio__button"></button>
            </Link>
          </li>
          <li className="portfolio__element">
            <Link className="portfolio__link" to='#'>
              Одностраничное приложение
              <button className="portfolio__button"></button>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Portfolio;