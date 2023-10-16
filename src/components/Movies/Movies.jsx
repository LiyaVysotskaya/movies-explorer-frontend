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
  const [endOfList, setEndOfList] = React.useState(false);
  const [searchValues, setSearchValues] = React.useState({ search: '' });
  const [requestResultText, setRequestResultText] = React.useState(null);

  const { desktop, tablet, mobile } = devises;
  const searchValuesKey = 'SEARCH_VALUES_KEY';
  const moviesListKey = 'MOVIES_LIST_KEY';

  React.useEffect(() => {
    const searchValues = JSON.parse(localStorage.getItem(searchValuesKey));
    const moviesList = JSON.parse(localStorage.getItem(moviesListKey));

    if (searchValues && moviesList) {
      setSearchValues(searchValues);
      setMoviesList(moviesList);
      showFilteredMovies(0, getRequestParams().default, moviesList, searchValues);
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

  const showFilteredMovies = async (skip, count, moviesList, searchValues) => {
    if (!moviesList.length) {
      moviesList = await getMovies();
      setMoviesList(moviesList);
      localStorage.setItem(moviesListKey, JSON.stringify(moviesList));
    }

    moviesList = moviesList.filter((movie) => searchFilter(movie, searchValues));

    if (moviesList.length) {
      let end = skip + count;
      if (moviesList.length < end) {
        end = moviesList.length;
        setEndOfList(true);
      }
      setFilteredMoviesList(x => x.concat(moviesList.slice(skip, end)));
    } else {
      setRequestResultText('Ничего не найдено.');
    }
  }

  async function getMovies() {
    try {
      return await apiMovies.getMoviesArray();
    } catch (error) {
      setRequestResultText('Ничего не найдено.');
      return [];
    }
  }

  const onShowMoreClick = async () => {
    await showFilteredMovies(filteredMoviesList.length, getRequestParams().more, moviesList, searchValues);
  }

  const onFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setSearchValues({ ...searchValues, [name]: e.target.hasOwnProperty('checked') ? checked : value });
  }

  const onFilterSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem(searchValuesKey, JSON.stringify(searchValues));
    setFilteredMoviesList([]);
    await showFilteredMovies(0, getRequestParams().default, moviesList, searchValues);
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
        <SearchForm values={searchValues} onSubmit={onFilterSubmit} onChange={onFilterChange} />
        <MoviesCardList moviesList={filteredMoviesList} onShowMoreClick={onShowMoreClick} endOfList={endOfList} showSavedIcon={true} />
      </main>
      <Footer />
    </>

  )
}

export default Movies;