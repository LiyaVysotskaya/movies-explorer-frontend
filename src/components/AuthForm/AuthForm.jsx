import React from "react";
import './AuthForm.css';

function AuthForm(props) {
  return (
    <form className="auth__form" method="POST" onSubmit={props.handleSubmit}>
      <fieldset className="auth__fieldset">
        {props.register &&
          <label className="auth__label">
            <p className="auth__text">Имя</p>
            <input
              className="auth__input"
              value={props.username}
              onChange={props.handleChange}
              name="username"
              type="text"
              minLength="2"
              required
              noValidate
            />
            <span className='auth__input-error'></span>
          </label>
        }

        <label className="auth__label">
          <p className="auth__text">E-mail</p>
          <input
            className="auth__input"
            value={props.email}
            onChange={props.handleChange}
            name="email"
            type="email"
            minLength="2"
            required
            noValidate
          />
          <span className='auth__input-error'></span>
        </label>
        <label className="auth__label">
          <p className="auth__text">Пароль</p>
          <input
            className="auth__input"
            value={props.password}
            onChange={props.handleChange}
            name="password"
            type="password"
            minLength="3"
            maxLength="20"
            required
            noValidate
          />
          <span className='auth__input-error'></span>
        </label>
      </fieldset>
      <button className={`auth__button ${props.login && 'auth__button_login'}`} type="submit">{props.buttonText}</button>
    </form>
  )
}

export default AuthForm;