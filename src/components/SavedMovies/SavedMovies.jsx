import React from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { movies, devises } from "../../utils/constants";

function SavedMovies() {
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
    let end = skip + count;

    if (movies.filter(x => x.saved).length < end) {
      end = movies.length;
      setEndOfList(true);
    }

    const loadedMovies = movies.filter(x => x.saved).slice(skip, end);

    setMoviesList(moviesList.concat(loadedMovies));
  }

  const onShowMoreClick = () => {
    loadData(moviesList.length, getRequestParams().more);
  }

  return (
    <main className="main__saved-movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} onShowMoreClick={onShowMoreClick} endOfList={endOfList} showSavedIcon={false} />
    </main>
  )
}

export default SavedMovies;