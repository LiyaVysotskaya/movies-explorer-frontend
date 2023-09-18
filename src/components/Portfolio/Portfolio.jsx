import React from "react";
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <nav className="portfolio__links">
        <ul className="portfolio__links-list">
          <li className="portfolio__element">Статичный сайт</li>
          <li className="portfolio__element">Адаптивный сайт</li>
          <li className="portfolio__element">Одностраничное приложение</li>
        </ul>
      </nav>
    </section>
  )
}

export default Portfolio;