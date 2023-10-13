import React from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { devises } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { apiMovies } from "../../utils/MoviesApi";

function Movies(props) {
  const [moviesList, setMoviesList] = React.useState([]);
  const [endOfList, setEndOfList] = React.useState(false);

  const { desktop, tablet, mobile } = devises;

  React.useEffect(() => {
    loadData(0, getRequestParams().default);
  }, []);

  const getRequestParams = () => {
    if (window.innerWidth > desktop.width) {
      return desktop.movies;
    } else if (window.innerWidth <= desktop.width && window.innerWidth > mobile.width) {
      return tablet.movies;
    } else {
      return mobile.movies;
    }
  }

  function getMovies(inputValue) {
    localStorage.setItem(inputValue);

    apiMovies.getMoviesArray()
    .then(data => {
      setMoviesList(data)
    })
    .catch(() => {
      console.error();
    })
  }

  const loadData = (skip, count) => {
    let end = skip + count;

    if (moviesList.length < end) {
      end = moviesList.length;
      setEndOfList(true);
    }

    const loadedMovies = moviesList.slice(skip, end);

    setMoviesList(moviesList.concat(loadedMovies));
  }

  const onShowMoreClick = () => {
    loadData(moviesList.length, getRequestParams().more);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} pageName={'movies'} />
      <main className="main main_movies">
        <SearchForm />
        <MoviesCardList moviesList={moviesList} onShowMoreClick={onShowMoreClick} endOfList={endOfList} showSavedIcon={true} />
      </main>
      <Footer />
    </>

  )
}

export default Movies;