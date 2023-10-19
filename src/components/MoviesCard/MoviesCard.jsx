import React from "react";
import "./MoviesCard.css";
import { apiMain } from "../../utils/MainApi";
import { bitApiBaseUrl } from "../../utils/constants";

function MoviesCard(props) {
  const onButtonClick = () => {
    if (props.movie.isSaved) {
      onDeleteMovie(props.movie.savedId);
    } else {
      onSaveMovie(props.movie);
    }
  }

  const onSaveMovie = movie => {
    apiMain.saveMovie(movie)
      .then(() => {
        props.onSaveMovie(movie.id);
      })
      .catch(console.error);
  };

  const onDeleteMovie = savedId => {
    apiMain.deleteMovie(savedId)
      .then(() => {
        props.onDeleteMovie(savedId);
      })
      .catch(console.error);
  };

  const getButtonClass = () => {
    if (props.movie.isSaved) {
      if (props.showSavedIcon) {
        return 'saved';
      } else {
        return 'delete';
      }
    } else {
      return 'add';
    }
  }

  return (
    <li className="movies__element">
      <article className="movies__container">
        <img className="movies__image" alt={props.movie.nameRU} src={`${bitApiBaseUrl}${props.movie.image.url}`} />
        <button
          className={`movies__button movies__button_${getButtonClass()}`}
          type="button"
          title={`${props.movie.isSaved ? 'Удалить' : 'Сохранить'}`}
          onClick={onButtonClick}
        >
          {!props.movie.isSaved && 'Сохранить'}
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