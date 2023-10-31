import React from "react";
import logo from '../../images/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import AuthForm from "../AuthForm/AuthForm";
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { apiMain } from "../../utils/MainApi";

function Register(props) {
  const navigate = useNavigate();

  const [requestResultText, setRequestResultText] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    username: '',
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    apiMain.register(values.username, values.email, values.password)
      .then(() => {
        apiMain.login(values.email, values.password)
        .then(() => {
          props.onLoggedIn();
          navigate('/movies', { replace: true });
        })
        .catch((error) => {
          setRequestResultText(error === 'Ошибка: 401' ? 'Вы ввели неправильный логин или пароль.' : 'При авторизации пользователя произошла ошибка.');
          console.log(`Ошибка авторизации ${error}`)
        })
      })
      .catch((error) => {
        setRequestResultText(error === 'Ошибка: 409' ? 'Пользователь с таким email уже существует.' : 'При регистрации пользователя произошла ошибка.');
        console.log(`Ошибка регистрации ${error}`)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function onInputChange(e) {
    handleChange(e);
    setRequestResultText(null);
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
          handleChange={onInputChange}
          password={values.password}
          error={errors}
          isValid={isValid}
          requestResultText={requestResultText}
          isLoading={isLoading}
          buttonText='Зарегистрироваться' />
        <Link className='register__link' to='/signin'>Уже зарегистрированы?
          <span className="register__link-text">Войти</span>
        </Link>
      </section>

    </main>
  )
}

export default Register;