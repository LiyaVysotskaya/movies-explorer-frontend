import React from "react";
import logo from '../../images/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import AuthForm from "../AuthForm/AuthForm";
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { apiMain } from "../../utils/MainApi";

function Login(props) {
  const navigate = useNavigate();

  const [requestResultText, setRequestResultText] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { values, handleChange, errors, resetForm, isValid } = useFormAndValidation({
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

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
        .catch((error) => {
          setRequestResultText(error === 'Ошибка: 401' ? 'Вы ввели неправильный логин или пароль.' : 'При авторизации пользователя произошла ошибка.');
          console.log(`Ошибка авторизации ${error}`)
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }

  function onInputChange(e) {
    handleChange(e);
    setRequestResultText(null);
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
          handleChange={onInputChange}
          password={values.password}
          error={errors}
          isValid={isValid}
          requestResultText={requestResultText}
          isLoading={isLoading}
          buttonText='Войти' />
        <Link className='login__link' to='/signup'>Ещё не зарегистрированы?
          <span className="login__link-text">Регистрация</span>
        </Link>
      </section>

    </main>
  )
}

export default Login;