import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <div className="movies">
      <ul className="movies__list">
        {props.moviesList.map(movie =>
          <MoviesCard
            key={movie.id}
            name={movie.name}
            duration={movie.duration}
            src={movie.image}
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