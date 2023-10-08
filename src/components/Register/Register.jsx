import React from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import './Register.css';
import AuthForm from "../AuthForm/AuthForm";

function Register(props) {
  return (
    <main className="main main_register">

      <section className="register">
        <Link className='register__link-logo' to='/'><img className="register__logo" src={logo} alt="Логотип диплома" /></Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <AuthForm
          register={true}
          // handleSubmit={handleSubmit}
          // email={values.email}
          // handleChange={handleChange}
          // password={values.password}
          buttonText='Зарегистрироваться' />
        <Link className='register__link' to='/signin'>Уже зарегистрированы?
          <span className="register__link-text">Войти</span>
        </Link>
      </section>

    </main>
  )
}

export default Register;