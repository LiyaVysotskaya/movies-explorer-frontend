import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ErrorContext } from '../../contexts/ErrorContext';
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [isError, setIsError] = React.useState(false)

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

  function handleUpdateUser(data) {
    apiMain.editProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(() => {
        setIsError(true)
        (console.error)
      });
  }

  function handleLogin() {
    setLoggedIn(true);
    loadData();
  }

  function handleLogout() {
    setLoggedIn(false);
    apiMain.logout();
  }

  // function setError() {
  //   setIsError(true)
  // }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ErrorContext.Provider value={isError}>
        <div className="page__container">
          <Routes>
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
                setError={setIsError}
              />
            } />
            <Route path="/signup" element={<Register onLoggedIn={handleLogin} setError={setIsError} />} />
            <Route path="/signin" element={<Login onLoggedIn={handleLogin} setError={setIsError} />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </ErrorContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
