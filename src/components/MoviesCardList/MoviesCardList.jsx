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
  };

  const onShowMoreClick = () => {
    sliceMoviesList(filteredMoviesList.length, props.requestParams.more);
  };

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
            showSavedIcon={props.showSavedIcon}
            onSaveMovie={props.onSaveMovie}
            onDeleteMovie={props.onDeleteMovie}
          />
        )}
      </ul>
      {(!endOfList && filteredMoviesList.length !== 0) &&
        <button className="movies__button-more" type="button" onClick={onShowMoreClick}>Ещё</button>}
    </div>
  )
};

export default MoviesCardList;