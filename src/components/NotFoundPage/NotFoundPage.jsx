import React from "react";
import './NotFoundPage.css';

function NotFoundPage() {
  const onBackClick = () => {
    window.history.back();
  }

  return (
    <main className="main main_error">
      <section className="error">
        <h1 className="error__title">404</h1>
        <p className="error__text">Страница не найдена</p>
        <button className="error__button" type="button" onClick={onBackClick}>Назад</button>
      </section>

    </main>
  )
}

export default NotFoundPage;