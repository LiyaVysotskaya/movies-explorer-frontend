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
  const [filteredMoviesList, setFilteredMoviesList] = React.useState([]);
  const [initialSearchValues, setInitialSearchValues] = React.useState({ search: '', isShort: false });
  const [requestError, setRequestError] = React.useState(null);

  const { desktop, tablet, mobile } = devises;
  const searchValuesKey = 'MOVIES_SEARCH_VALUES_KEY';
  const moviesListKey = 'MOVIES_LIST_KEY';

  React.useEffect(() => {
    const searchValues = JSON.parse(localStorage.getItem(searchValuesKey));
    const moviesList = JSON.parse(localStorage.getItem(moviesListKey));

    if (searchValues && moviesList) {
      setInitialSearchValues(searchValues);
      setMoviesList(moviesList);
      filterMovies(moviesList, searchValues);
    }
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

  const filterMovies = async (moviesList, searchValues) => {
    if (!moviesList.length) {
      moviesList = await getMovies();
      setMoviesList(moviesList);
      localStorage.setItem(moviesListKey, JSON.stringify(moviesList));
    }

    moviesList = moviesList.filter((movie) => searchFilter(movie, searchValues));
    setFilteredMoviesList(moviesList);
  }

  async function getMovies() {
    try {
      setRequestError(null);
      return await apiMovies.getMoviesArray();
    } catch (error) {
      setRequestError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      return [];
    }
  }

  const onFilterSubmit = async (searchValues) => {
    localStorage.setItem(searchValuesKey, JSON.stringify(searchValues));
    await filterMovies(moviesList, searchValues);
  }

  const searchFilter = (movie, searchValues) => {
    const nameRu = movie.nameRU.toLowerCase().trim();
    const nameEn = movie.nameEN.toLowerCase().trim();
    const nameMovie = searchValues.search.toLowerCase().trim();

    return (nameRu.includes(nameMovie) || nameEn.includes(nameMovie)) && (!searchValues.isShort || movie.duration <= 40);
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} pageName={'movies'} />
      <main className="main main_movies">
        <SearchForm initialValues={initialSearchValues} onSubmit={onFilterSubmit} />
        <MoviesCardList
          moviesList={filteredMoviesList}
          requestParams={getRequestParams()}
          showSavedIcon={true}
          requestError={requestError}
        />
      </main>
      <Footer />
    </>

  )
}

export default Movies;