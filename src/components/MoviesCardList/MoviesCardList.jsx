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
          <MoviesCard movie={moviesAll} key={movie.id} name={movie.name} duration={movie.duration} src={movie.image} />
        )}
      </ul>
      <button className="movies__button-more" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;