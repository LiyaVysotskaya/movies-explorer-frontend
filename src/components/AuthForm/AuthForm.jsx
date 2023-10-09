import React from "react";
import './AuthForm.css';

function AuthForm(props) {
  return (
    <form className="auth" method="POST" onSubmit={props.handleSubmit}>
      <fieldset className="auth__fieldset">
        {props.register &&
          <label className="auth__label">
            <span className="auth__text">Имя</span>
            <input
              className="auth__input"
              value={props.username}
              onChange={props.handleChange}
              name="username"
              type="text"
              minLength="2"
              maxLength='16'
              placeholder="Имя"
              required
            />
            <span className='auth__input-error'></span>
          </label>
        }

        <label className="auth__label">
          <span className="auth__text">E-mail</span>
          <input
            className="auth__input"
            value={props.email}
            onChange={props.handleChange}
            name="email"
            type="email"
            minLength="2"
            placeholder="E-mail"
            required
          />
          <span className='auth__input-error'></span>
        </label>
        <label className="auth__label">
          <span className="auth__text">Пароль</span>
          <input
            className="auth__input"
            value={props.password}
            onChange={props.handleChange}
            name="password"
            type="password"
            minLength="3"
            maxLength="20"
            placeholder="Пароль"
            required
          />
          <span className='auth__input-error'></span>
        </label>
      </fieldset>
      <button className={`auth__button ${props.login && 'auth__button_login'}`} type="submit">{props.buttonText}</button>
    </form>
  )
}

export default AuthForm;