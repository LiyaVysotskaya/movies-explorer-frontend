import React from "react";
import './AuthForm.css';
import { emailRegEx } from "../../utils/constants";

function AuthForm(props) {
  return (
    <form className="auth" method="POST" onSubmit={props.handleSubmit} noValidate>
      <fieldset className="auth__fieldset">
        {props.register &&
          <label className="auth__label">
            <span className="auth__text">Имя</span>
            <input
            className={`auth__input ${props.error.username && 'auth__input_invalid'}`}
              value={props.username}
              onChange={props.handleChange}
              name="username"
              type="text"
              minLength="2"
              maxLength='16'
              placeholder="Имя"
              required
            />
            <span className={`auth__input-error  ${props.error.username && 'auth__input-error_active'}`}>{props.error.username}</span>
          </label>
        }

        <label className="auth__label">
          <span className="auth__text">E-mail</span>
          <input
            className={`auth__input ${props.error.email && 'auth__input_invalid'}`}
            value={props.email}
            onChange={props.handleChange}
            name="email"
            type="email"
            minLength="2"
            placeholder="E-mail"
            pattern={emailRegEx}
            required
          />
          <span className={`auth__input-error  ${props.error.email && 'auth__input-error_active'}`}>{props.error.email}</span>
        </label>
       <label className="auth__label">
          <span className="auth__text">Пароль</span>
          <input
            className={`auth__input ${props.error.password && 'auth__input_invalid'}`}
            value={props.password}
            onChange={props.handleChange}
            name="password"
            type="password"
            minLength="3"
            maxLength="20"
            placeholder="Пароль"
            required
          />
          <span className={`auth__input-error  ${props.error.password && 'auth__input-error_active'}`}>{props.error.password}</span>
        </label>
      </fieldset>
      <button className={`auth__button ${props.login && 'auth__button_login'}`} type="submit">{props.buttonText}</button>
    </form>
  )
}

export default AuthForm;