import React from "react";
import logo from '../../images/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import AuthForm from "../AuthForm/AuthForm";
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { apiMain } from "../../utils/MainApi";

function Login(props) {
  const navigate = useNavigate();

  const { values, handleChange, resetForm } = useFormAndValidation({
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    } else {
      apiMain.login(values.email, values.password)
        .then(() => {
          props.onLoggedIn();
          resetForm({
            email: '',
            password: ''
          });
          navigate('/movies', { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка авторизации ${err}`)
        })
    }
  }
  return (
    <main className="main main_login">

      <section className="login">
        <Link className='login__link-logo' to='/'><img className="login__logo" src={logo} alt="Логотип диплома" /></Link>
        <h1 className="login__title">Рады видеть!</h1>
        <AuthForm
          login={true}
          handleSubmit={handleSubmit}
          email={values.email}
          handleChange={handleChange}
          password={values.password}
          buttonText='Войти' />
        <Link className='login__link' to='/signup'>Ещё не зарегистрированы?
          <span className="login__link-text">Регистрация</span>
        </Link>
      </section>

    </main>
  )
}

export default Login;