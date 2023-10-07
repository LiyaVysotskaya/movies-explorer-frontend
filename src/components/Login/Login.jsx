import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import './Login.css';
import AuthForm from "../AuthForm/AuthForm";

function Login() {
  return(
    <main className="main_login">

      <section className="login">
        <Link className='auth__link-logo' to='/' ><img className="auth__logo" src={logo} alt="Логотип диплома" /></Link>
        <h1 className="login__title">Рады видеть!</h1>
        <AuthForm
          login={true}
          // handleSubmit={handleSubmit}
          // email={values.email}
          // handleChange={handleChange}
          // password={values.password}
          buttonText='Войти' />
        <Link className='auth__link' to='/signin'>Ещё не зарегистрированы?
          <span className="auth__link auth__link-black">Регистрация</span>
        </Link>
      </section>

    </main>
  )
}

export default Login;