import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const [endOfList, setEndOfList] = React.useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = React.useState([]);

  React.useEffect(() => {
    setFilteredMoviesList([]);
    sliceMoviesList(0, props.requestParams.default);
  }, [props.moviesList]);

  const sliceMoviesList = (skip, count) => {
    if (props.moviesList.length) {
      let end = skip + count;
      if (props.moviesList.length < end) {
        end = props.moviesList.length;
        setEndOfList(true);
      } else {
        setEndOfList(false);
      }
      setFilteredMoviesList(x => x.concat(props.moviesList.slice(skip, end)));
    } else {
      setFilteredMoviesList([]);
    }
  }

  const onShowMoreClick = () => {
    sliceMoviesList(filteredMoviesList.length, props.requestParams.more);
  }

  // function handleMovieLike() {
  //   const isLiked = movies.some(element => props.movie.id === element.movieId);

  //   apiMain.changeLikeStatus(movie.id, !isLiked)
  //   .then((newMovie) => {
  //     setMovies((state) => state.map((c) => c._id === movie.id  ? newMovie : c));
  //   })
  //   .catch(console.error);
  // }

  return (
    <div className="movies">
      {(filteredMoviesList.length === 0 && !props.requestError) &&
        <span className="movies__text">Ничего не найдено.</span>
      }
      {props.requestError &&
        <span className="movies__text">{props.requestError}</span>
      }
      <ul className="movies__list">
        {filteredMoviesList.map(movie =>
          <MoviesCard
            key={movie.id}
            movie={movie}
            saved={movie.saved}
            showSavedIcon={props.showSavedIcon}
          // onLikeClick={handleMovieLike}
          />
        )}
      </ul>
      {(!endOfList && filteredMoviesList.length !== 0) &&
        <button className="movies__button-more" type="button" onClick={onShowMoreClick}>Ещё</button>}
    </div>
  )
}

export default MoviesCardList;