import React from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { devises } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { apiMain } from "../../utils/MainApi";

function SavedMovies(props) {
  const [cachedMoviesList, setCachedMoviesList] = React.useState([]);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState([]);
  const [requestError, setRequestError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { desktop, tablet, mobile } = devises;

  React.useEffect(() => {
    const setMoviesAsync = async () =>{
      const moviesList = await getSavedMovies();
      setCachedMoviesList(moviesList);
      setFilteredMoviesList(moviesList);
    }
    setMoviesAsync();
  }, [])

  const filterMovies = (moviesList, searchValues) => {
    moviesList = moviesList.filter((movie) => searchFilter(movie, searchValues));
    setFilteredMoviesList(moviesList);
  }

  const getSavedMovies = async () => {
    try {
      setIsLoading(true)
      setRequestError(null);
      let moviesList = await apiMain.getSavedMovies();
      moviesList = moviesList.reverse().map(x => {
        x.isSaved = true;
        x.savedId = x._id;
        x.id = x.movieId;
        return x;
      });
      return moviesList;
    } catch (error) {
      setRequestError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      return [];
    } finally {
      setIsLoading(false)
    }
  }

  const onDeleteMovie = id => {
    setCachedMoviesList(moviesList => moviesList.filter(x => x.id !== id));
    setFilteredMoviesList(moviesList => moviesList.filter(x => x.id !== id));
  }

  const onFilterSubmit = (searchValues) => {
    filterMovies(cachedMoviesList, searchValues);
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
        <SearchForm onSubmit={onFilterSubmit} isLoading={isLoading} />
        <MoviesCardList
          moviesList={filteredMoviesList}
          requestParams={{
            default: Number.MAX_SAFE_INTEGER,
            more: Number.MAX_SAFE_INTEGER,
          }}
          showSavedIcon={false}
          requestError={requestError}
          onDeleteMovie={onDeleteMovie}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </>

  )
}

export default SavedMovies;