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
            <Link className="portfolio__link" to='https://liyavysotskaya.github.io/how-to-learn/' target="blank">
              Статичный сайт
              <button className="portfolio__button"></button>
            </Link>
          </li>
          <li className="portfolio__element">
            <Link className="portfolio__link" to='https://liyavysotskaya.github.io/russian-travel/' target="blank">
              Адаптивный сайт
              <button className="portfolio__button"></button>
            </Link>
          </li>
          <li className="portfolio__element">
            <Link className="portfolio__link" to='https://liyavysotskaya.github.io/mesto/' target="blank">
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