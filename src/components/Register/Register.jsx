import React from "react";
import logo from '../../images/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import AuthForm from "../AuthForm/AuthForm";
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { apiMain } from "../../utils/MainApi";

function Register(props) {
  const navigate = useNavigate();

  const { values, handleChange, errors  } = useFormAndValidation({
    username: '',
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    apiMain.register(values.username, values.email, values.password)
      .then(() => {
        apiMain.login(values.email, values.password)
        .then(() => {
          props.onLoggedIn();
          navigate('/movies', { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка авторизации ${err}`)
        })
      })
      .catch((err) => {
        console.log(`Ошибка регистрации ${err}`)
      })
  }

  return (
    <main className="main main_register">

      <section className="register">
        <Link className='register__link-logo' to='/'><img className="register__logo" src={logo} alt="Логотип диплома" /></Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <AuthForm
          register={true}
          handleSubmit={handleSubmit}
          username={values.username}
          email={values.email}
          handleChange={handleChange}
          password={values.password}
          error={errors}
          buttonText='Зарегистрироваться' />
        <Link className='register__link' to='/signin'>Уже зарегистрированы?
          <span className="register__link-text">Войти</span>
        </Link>
      </section>

    </main>
  )
}

export default Register;