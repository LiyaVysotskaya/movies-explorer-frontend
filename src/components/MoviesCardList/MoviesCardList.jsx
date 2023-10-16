import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
// import { apiMain } from "../../utils/MainApi";

function MoviesCardList(props) {

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
      {props.moviesList.length === 0 &&
        <span className="movies__text">Ничего не найдено.</span>
      }
      <ul className="movies__list">
        {props.moviesList.map(movie =>
          <MoviesCard
            key={movie.id}
            movie={movie}
            saved={movie.saved}
            showSavedIcon={props.showSavedIcon}
            // onLikeClick={handleMovieLike}
          />
        )}
      </ul>
      {!props.endOfList &&
        <button className="movies__button-more" type="button" onClick={props.onShowMoreClick}>Ещё</button>}
    </div>
  )
}

export default MoviesCardList;