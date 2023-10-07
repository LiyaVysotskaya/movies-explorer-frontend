import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';

// import logo from '../../images/logo.svg';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="page__container">
      <Routes>
        <Route path="/" element={
            <Main loggedIn={loggedIn} />
        } />
        <Route path="/movies" element={
            <Movies loggedIn={loggedIn}/>
        }
        />
        <Route path="/saved-movies" element={
            <SavedMovies loggedIn={loggedIn} />
        } />
        <Route path="/profile" element={
            <Profile loggedIn={loggedIn} />
        } />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
