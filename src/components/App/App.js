import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

// import logo from '../../images/logo.svg';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="page__container">
      <Header loggedIn={loggedIn} />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={
            <ProtectedRoute
              element={Movies}
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/saved-movies" element={<></>} />
        <Route path="/profile" element={<></>} />
        <Route path="/sign-up" element={<></>} />
        <Route path="/sign-in" element={<></>} />
        <Route path="/*" element={<></>} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
