import React from "react";
import './Profile.css';
import Header from "../Header/Header";

function Profile(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} handleLogout={props.handleLogout} pageName={'profile'} />
      <main className="main main_profile">
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
                  maxLength='16'
                  placeholder="Имя"
                  required
                />
                <span className='profile__input-error'></span>
              </label>

              <label className="profile__label">
                <span className="profile__text">E-mail</span>
                <input
                  className="profile__input"
                  value={props.email}
                  onChange={props.handleChange}
                  name="email"
                  type="email"
                  minLength="2"
                  placeholder="E-mail"
                  required
                />
                <span className='profile__input-error'></span>
              </label>
            </fieldset>
            <button className="profile__button" type="submit">Редактировать</button>
            <button className="profile__button profile__button_logout" type="button" onClick={props.handleLogout}>Выйти из аккаунта</button>
          </form>
        </section>
      </main>

    </>

  )
}

export default Profile;