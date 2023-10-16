import React from "react";
import "./MoviesCard.css";

function MoviesCard(props) {

  const onDeleteClick = () => {
    props.saved = false;
  }

  // const onLikeClick = () => {
  //   props.saved = true;
  // }

  // function handleMovieLike() {
  //   const isLiked = movies.some(element => props.movie.id === element.movieId);

  //   apiMain.changeLikeStatus(movie.id, !isLiked)
  //   .then((newMovie) => {
  //     setMovies((state) => state.map((c) => c._id === movie.id  ? newMovie : c));
  //   })
  //   .catch(console.error);
  // }

  const getButtonClass = () => {
    if (props.saved) {
      if (props.showSavedIcon) {
        return 'saved';
      } else {
        return 'delete';
      }
    }  else {
      return 'add';
    }
  }

  return (
    <li className="movies__element">
      <article className="movies__container">
        <img className="movies__image" alt={props.movie.nameRU} src={`https://api.nomoreparties.co${props.movie.image.url}`} />
        <button
            className={`movies__button movies__button_${getButtonClass()}`}
            type="button"
            title={`${props.saved ? 'Удалить' : 'Сохранить'}`}
            onClick={props.saved ? onDeleteClick : props.onLikeClick}
          >
            {!props.saved && 'Сохранить'}
          </button>
        <div className="movies__basement">
          <h2 className="movies__name">{props.movie.nameRU}</h2>
          <span className="movies__time">{props.movie.duration}</span>
        </div>
      </article>
    </li>
  )
}

export default MoviesCard;