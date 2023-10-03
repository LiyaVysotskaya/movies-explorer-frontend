import React from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { movies, devises } from "../../utils/constants";

function Movies() {
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

  const loadData = (skip, count) => {
    let end = skip+count;

    if (movies.length < end) {
      end = movies.length;
      setEndOfList(true);
    }

    const loadedMovies = movies.slice(skip, end);

    setMoviesList(moviesList.concat(loadedMovies));
  }

  const onShowMoreClick = () => {
    loadData(moviesList.length, getRequestParams().more);
  }

  return (
    <main className="main__movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} onShowMoreClick={onShowMoreClick} endOfList={endOfList} />
    </main>
  )
}

export default Movies;