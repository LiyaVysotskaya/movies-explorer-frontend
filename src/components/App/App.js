import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

import logo from '../../images/logo.svg';
import './App.css';

function App() {
  return (
    <div className="page__container">
      <Header></Header>
    </div>
  );
}

export default App;
