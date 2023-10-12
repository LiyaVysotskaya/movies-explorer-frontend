import React from "react";
import './Profile.css';
import Header from "../Header/Header";
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { emailRegEx } from "../../utils/constants";
import { ErrorContext } from "../../contexts/ErrorContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const errorActive = React.useContext(ErrorContext);

  const { values, handleChange, errors, setValues, isValid } = useFormAndValidation({
    username: '',
    email: ''
  })

  React.useEffect(() => {
    if (currentUser) {
      setValues({
        username: currentUser.name,
        email: currentUser.email
      })
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: values.username,
      email: values.email
    });
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} handleLogout={props.handleLogout} pageName={'profile'} />
      <main className="main main_profile">
        <section className="profile">
          <h1 className="profile__title">{`Привет, ${currentUser.name || 'Виталий'}!`}</h1>
          <form className="profile__form" method="POST" onSubmit={handleSubmit} noValidate>
            <fieldset className="profile__fieldset">
              <label className="profile__label">
                <span className="profile__text">Имя</span>
                <input
                  className={`profile__input ${errors.username && 'profile__input_invalid'}`}
                  value={values.username}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  minLength="2"
                  maxLength='16'
                  placeholder="Имя"
                  required
                />
                <span className={`profile__input-error ${errors.username && 'auth__input-error_active'}`}>{errors.username}</span>
              </label>

              <label className="profile__label">
                <span className="profile__text">E-mail</span>
                <input
                  className={`profile__input ${errors.email && 'profile__input_invalid'}`}
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  minLength="2"
                  placeholder="E-mail"
                  pattern={emailRegEx}
                  required
                />
                <span className={`profile__input-error  ${errors.email && 'auth__input-error_active'}`}>{errors.email}</span>
              </label>
            </fieldset>
            <span
              className={`profile__error ${errorActive && 'profile__error_active'}`}>
              {props.errorText === 'Ошибка: 409' ? 'Пользователь с таким email уже существует.' : 'При обновлении профиля произошла ошибка.'}
            </span>
            <button className="profile__button" type="submit">Редактировать</button>
            <button className="profile__button profile__button_logout" type="button" onClick={props.handleLogout}>Выйти из аккаунта</button>
          </form>
        </section>
      </main>

    </>

  )
}

export default Profile;