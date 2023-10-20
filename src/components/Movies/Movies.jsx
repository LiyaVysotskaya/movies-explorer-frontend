import React from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { devises } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { apiMovies } from "../../utils/MoviesApi";
import { apiMain } from "../../utils/MainApi";

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
      const savedMoviesList = await getSavedMovies();
      moviesList.forEach(x => {
        const savedItem = savedMoviesList.find(y => x.id === y.movieId);
        if(savedItem){
          x.isSaved = true;
          x.savedId = savedItem._id;
        }
      });
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

  async function getSavedMovies() {
    try {
      setRequestError(null);
      return await apiMain.getSavedMovies();
    } catch (error) {
      setRequestError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      return [];
    }
  }

  const onSaveMovie = (id, savedId) => {
    setMoviesList(arr => {
      arr = moviesList.map(x => ({...x, isSaved: x.isSaved || x.id === id, savedId: x.id === id ? savedId : x.savedId}));
      localStorage.setItem(moviesListKey, JSON.stringify(arr));
      return arr;
    });
    setFilteredMoviesList(arr => arr.map(x => ({...x, isSaved: x.isSaved || x.id === id, savedId: x.id === id ? savedId : x.savedId})));
  }

  const onDeleteMovie = id => {
    setMoviesList(arr => {
      arr = moviesList.map(x => ({...x, isSaved:  x.id === id ? false : x.isSaved, savedId: x.id === id ? undefined : x.savedId}));
      localStorage.setItem(moviesListKey, JSON.stringify(arr));
      return arr;
    });
    setFilteredMoviesList(arr => arr.map(x => ({...x, isSaved:  x.id === id ? false : x.isSaved, savedId: x.id === id ? undefined : x.savedId})));
  }

  // const onDeleteMovie = id => {
  //   setMoviesList(moviesList.map(x => ({...x, isSaved: x.id === id ? false : x.isSaved })));
  //   setFilteredMoviesList(filteredMoviesList.map(x => ({...x, isSaved:  x.id === id ? false : x.isSaved })));
  //   localStorage.setItem(moviesListKey, JSON.stringify(moviesList));
  // }


  // const onDeleteMovie = id => {
  //   setMoviesList(moviesList.map(x => ({...x, isSaved: x.id === id ? false : x.isSaved })));
  //   setFilteredMoviesList(filteredMoviesList.map(x => ({...x, isSaved:  x.id === id ? false : x.isSaved })));
  //   localStorage.setItem(moviesListKey, JSON.stringify(moviesList));
  // }

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
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>

  )
}

export default Movies;