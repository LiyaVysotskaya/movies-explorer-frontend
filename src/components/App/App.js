import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';

import logo from '../../images/logo.svg';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  return (
    <div className="page__container">
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />
      <Main></Main>
    </div>
  );
}

export default App;
