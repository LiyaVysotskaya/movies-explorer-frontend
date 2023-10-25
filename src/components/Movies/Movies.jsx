import React from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { devises } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { apiMovies } from "../../utils/MoviesApi";
import { apiMain } from "../../utils/MainApi";
import { bitApiBaseUrl } from "../../utils/constants";

function Movies(props) {
  const [cachedMoviesList, setCachedMoviesList] = React.useState([]);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState([]);
  const [initialSearchValues, setInitialSearchValues] = React.useState({ search: '', isShort: false });
  const [requestError, setRequestError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { desktop, tablet, mobile } = devises;
  const searchValuesKey = 'MOVIES_SEARCH_VALUES_KEY';
  const moviesListKey = 'MOVIES_LIST_KEY';

  React.useEffect(() => {
    const searchValues = JSON.parse(localStorage.getItem(searchValuesKey));
    const moviesList = JSON.parse(localStorage.getItem(moviesListKey));

    const setMoviesAsync = async () =>{
      const savedMoviesList = await apiMain.getSavedMovies();
      moviesList.forEach(x => {
        const savedItem = savedMoviesList.find(y => x.id === y.movieId);
        x.isSaved = !!savedItem;
        x.savedId = savedItem?._id;
      });
      setInitialSearchValues(searchValues);
      setCachedMoviesList(moviesList);
      filterMovies(moviesList, searchValues);
    }

    if (searchValues && moviesList) {
      setMoviesAsync();
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
      setCachedMoviesList(moviesList);
      localStorage.setItem(moviesListKey, JSON.stringify(moviesList));
    }

    moviesList = moviesList.filter((movie) => searchFilter(movie, searchValues));
    setFilteredMoviesList(moviesList);
  }

  const getMovies = async () => {
    try {
      setIsLoading(true);
      setRequestError(null);
      const moviesList = await apiMovies.getMoviesArray();
      const savedMoviesList = await apiMain.getSavedMovies();
      moviesList.forEach(x => {
        const savedItem = savedMoviesList.find(y => x.id === y.movieId);
        if (savedItem) {
          x.isSaved = true;
          x.savedId = savedItem._id;
        }
        x.thumbnail = `${bitApiBaseUrl}${x.image.formats.thumbnail.url}`;
        x.image = `${bitApiBaseUrl}${x.image.url}`;
      });
      return moviesList;
    } catch (error) {
      setRequestError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  const onSaveMovie = (id, savedId) => {
    setCachedMoviesList(moviesList => {
      moviesList = moviesList.map(x => ({ ...x, isSaved: x.isSaved || x.id === id, savedId: x.id === id ? savedId : x.savedId }));
      localStorage.setItem(moviesListKey, JSON.stringify(moviesList));
      return moviesList;
    });
    setFilteredMoviesList(moviesList => moviesList.map(x => ({ ...x, isSaved: x.isSaved || x.id === id, savedId: x.id === id ? savedId : x.savedId })));
  }

  const onDeleteMovie = id => {
    setCachedMoviesList(moviesList => {
      moviesList = moviesList.map(x => ({ ...x, isSaved: x.id === id ? false : x.isSaved, savedId: x.id === id ? undefined : x.savedId }));
      localStorage.setItem(moviesListKey, JSON.stringify(moviesList));
      return moviesList;
    });
    setFilteredMoviesList(moviesList => moviesList.map(x => ({ ...x, isSaved: x.id === id ? false : x.isSaved, savedId: x.id === id ? undefined : x.savedId })));
  }

  const onFilterSubmit = async (searchValues) => {
    localStorage.setItem(searchValuesKey, JSON.stringify(searchValues));
    await filterMovies(cachedMoviesList, searchValues);
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
        <SearchForm initialValues={initialSearchValues} onSubmit={onFilterSubmit} isLoading={isLoading} />
        <MoviesCardList
          moviesList={filteredMoviesList}
          requestParams={getRequestParams()}
          showSavedIcon={true}
          requestError={requestError}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </>

  )
}

export default Movies;