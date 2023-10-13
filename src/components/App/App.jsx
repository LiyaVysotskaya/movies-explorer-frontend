import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { apiMain } from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    tokenCheck();
  }, [])

  function loadData() {
    apiMain.getUserData()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(console.error);

    apiMain.getMoviesArray()
      .then(data => {
        setMovies(data);
      })
      .catch(console.error);
  }

  function tokenCheck() {
    apiMain.checkToken()
      .then(res => {
        setLoggedIn(!!res);
        if (res) {
          loadData();
        }
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }

  function handleUpdateUser(user) {
    setCurrentUser(user);
  }

  function handleLogin() {
    setLoggedIn(true);
    loadData();
  }

  function handleLogout() {
    setLoggedIn(false);
    apiMain.logout();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        {loggedIn !== null && <Routes>
          <Route path="/" element={
            <Main loggedIn={loggedIn} />
          } />
          <Route path="/movies" element={
            <ProtectedRoute
              element={Movies}
              loggedIn={loggedIn}
            />
          }
          />
          <Route path="/saved-movies" element={
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={loggedIn}
            />
          } />
          <Route path="/profile" element={
            <ProtectedRoute
              element={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              handleLogout={handleLogout}
            />
          } />
          <Route path="/signup" element={<Register onLoggedIn={handleLogin} />} />
          <Route path="/signin" element={<Login onLoggedIn={handleLogin} />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
