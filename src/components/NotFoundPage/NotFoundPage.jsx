import React from "react";
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <main className="main_error">
      <section className="error">
        <h1 className="error__title">404</h1>
        <p className="error__text">Страница не найдена</p>
        <button className="error__button">Назад</button>
      </section>

    </main>
  )
}

export default NotFoundPage;