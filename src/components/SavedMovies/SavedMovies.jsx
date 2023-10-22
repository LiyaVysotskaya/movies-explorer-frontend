import React from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { devises } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { apiMain } from "../../utils/MainApi";

function SavedMovies(props) {
  const [moviesList, setMoviesList] = React.useState([]);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState([]);
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);
  const [initialSearchValues, setInitialSearchValues] = React.useState({ search: '', isShort: false });
  const [requestError, setRequestError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { desktop, tablet, mobile } = devises;
  const searchValuesKey = 'SAVED_MOVIES_SEARCH_VALUES_KEY';
  const moviesListKey = 'SAVED_MOVIES_LIST_KEY';

  React.useEffect(() => {
    if (props.loggedIn) {
      apiMain.getSavedMovies()
        .then((res) => {
          // console.log(res)
          setSavedMoviesList(res.reverse());
          setFilteredMoviesList(savedMoviesList);
        })
        .catch(console.error);
    }
  }, [])

  // React.useEffect(() => {
  //   apiMain.getSavedMovies()
  //     .then(res => {
  //       setMoviesList(res.reverse())
  //     })
  //     .catch(console.error);

  //   filterMovies(moviesList, initialSearchValues);
  // }, [])

  // React.useEffect(() => {
  //   setMoviesList(async () => {
  //     const savedMoviesList = await getSavedMovies();
  //     localStorage.setItem(moviesListKey, JSON.stringify(savedMoviesList));
  //     return setMoviesList(savedMoviesList.reverse());
  //   });
  //   console.log(moviesList)
  //   filterMovies(moviesList, initialSearchValues);
  // }, []);

    // React.useEffect(() => {
    //   const savedMoviesList = getSavedMovies();
    //   setMoviesList(savedMoviesList)
    // }, [])

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
    const savedMoviesList = await getSavedMovies();
    setMoviesList(savedMoviesList.reverse());
    localStorage.setItem(moviesListKey, JSON.stringify(savedMoviesList));

    moviesList = moviesList.filter((movie) => searchFilter(movie, searchValues));
    setFilteredMoviesList(moviesList);
  }

  async function getSavedMovies() {
    try {
      setIsLoading(true)
      setRequestError(null);
      return await apiMain.getSavedMovies()
    } catch (error) {
      setRequestError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      return [];
    } finally {
      setIsLoading(false)
    }
  }

  const onDeleteMovie = id => {
    setMoviesList(arr => {
      arr = moviesList.map(x => ({ ...x, isSaved: x.id === id ? false : x.isSaved, savedId: x.id === id ? undefined : x.savedId }));
      localStorage.setItem(moviesListKey, JSON.stringify(arr));
      return arr;
    });
    setFilteredMoviesList(arr => arr.map(x => ({ ...x, isSaved: x.id === id ? false : x.isSaved, savedId: x.id === id ? undefined : x.savedId })));
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
      <Header loggedIn={props.loggedIn} pageName={'saved-movies'} />
      <main className="main main_saved-movies">
        <SearchForm initialValues={initialSearchValues} onSubmit={onFilterSubmit} />
        <MoviesCardList
          moviesList={filteredMoviesList}
          requestParams={getRequestParams()}
          showSavedIcon={false}
          requestError={requestError}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>

  )
}

export default SavedMovies;