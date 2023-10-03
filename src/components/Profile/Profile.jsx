import React from "react";
import './Profile.css';

function Profile(props) {
  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${props.name || 'Виталий'}!`}</h1>
      <form className="profile__form" method="POST" onSubmit={props.handleSubmit}>
        <fieldset className="profile__fieldset">
          <label className="profile__label">
            <span className="profile__text">Имя</span>
            <input
              className="profile__input"
              value={props.username}
              onChange={props.handleChange}
              name="username"
              type="text"
              minLength="2"
              required
              noValidate
            />
            <span className='profile__input-error'></span>
          </label>

          <label className="profile__label">
            <span className="profile__text">E-mail</span>
            <input
              className="profile__input"
              value={props.password}
              onChange={props.handleChange}
              name="email"
              type="email"
              minLength="2"
              maxLength="20"
              required
              noValidate
            />
            <span className='profile__input-error'></span>
          </label>
        </fieldset>
        <button className="profile__button" type="submit">Редактировать</button>
        <button className="profile__button profile__button_logout" type="submit">Выйти из аккаунта</button>
      </form>
    </section>
  )
}

export default Profile;