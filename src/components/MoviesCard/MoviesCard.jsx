import React from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  return(
    <li className="movies__element">
      <article>
        <img className="movies__image" alt={props.name} src={props.src} />
        <div className="movies__basement">
          <p className="movies__name">{props.name}</p>
          <span className="movies__time">{props.duration}</span>
        </div>
      </article>
    </li>
  )
}

export default MoviesCard;