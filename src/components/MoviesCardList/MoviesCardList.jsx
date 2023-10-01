import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import { movies } from "../../utils/constants";

function MoviesCardList(props) {
  const [moviesAll, setMoviesAll] = React.useState([]);

  React.useEffect(() => {
    setMoviesAll(movies);
  }, []);

  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.map(movie =>
          <MoviesCard movie={moviesAll} key={movie.id}  />
        )}
      </ul>
      <button className="movie__button-more" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;