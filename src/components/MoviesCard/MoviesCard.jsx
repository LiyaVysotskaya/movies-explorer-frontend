import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  const location = useLocation();

  const onDeleteClick = () => {
    // evt.target.classList.delete('movies__button_saved');
    props.saved = false;
  }

  const onLikeClick = () => {
    // evt.target.classList.add('movies__button_saved');
    props.saved = true;
  }

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
        <img className="movies__image" alt={props.name} src={props.src} />
        <button
            className={`movies__button movies__button_${getButtonClass()}`}
            type="button"
            title={`${props.saved ? 'Удалить' : 'Сохранить'}`}
            onClick={props.saved ? onDeleteClick : onLikeClick}
          >
            {!props.saved && 'Сохранить'}
          </button>
        {/* {(location.pathname === '/movies' || location.pathname === '/saved-movies') &&
          <button
            className={`movies__button movies__button_${props.saved ? 'saved' : 'add'
              }`}
            type="button"
            title={`${props.saved && 'Сохранить'}`}
            onClick={props.saved ? onDeleteClick : onLikeClick}
          ></button>
        } */}
        <div className="movies__basement">
          <p className="movies__name">{props.name}</p>
          <span className="movies__time">1ч 17м</span>
        </div>
      </article>
    </li>
  )
}

export default MoviesCard;