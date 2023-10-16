import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <div className="movies">
      {props.moviesList.length === 0 &&
        <span className="movies__text">Ничего не найдено.</span>
      }
      <ul className="movies__list">
        {props.moviesList.map(movie =>
          <MoviesCard
            key={movie.id}
            movie={movie}
            saved={movie.saved}
            showSavedIcon={props.showSavedIcon} />
        )}
      </ul>
      {!props.endOfList &&
        <button className="movies__button-more" type="button" onClick={props.onShowMoreClick}>Ещё</button>}
    </div>
  )
}

export default MoviesCardList;