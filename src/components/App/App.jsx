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

// import logo from '../../images/logo.svg';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="page__container">
      <Routes>
        <Route path="/" element={
          <>
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer></Footer>
          </>
        } />
        <Route path="/movies" element={
          <>
            <Header loggedIn={loggedIn} />
            <Movies />
            <Footer></Footer>
          </>
          // <ProtectedRoute
          //   element={Movies}
          //   loggedIn={loggedIn}
          // />
        }
        />
        <Route path="/saved-movies" element={
          <>
            <Header loggedIn={loggedIn} />
            <SavedMovies />
            <Footer></Footer>
          </>
        } />
        <Route path="/profile" element={
          <>
            <Header loggedIn={loggedIn} />
            <Profile />
          </>
        } />
        <Route path="/sign-up" element={<></>} />
        <Route path="/sign-in" element={<></>} />
        <Route path="/*" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
