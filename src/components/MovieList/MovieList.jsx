import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movieList }) => {
  const location = useLocation();
  const defaultPosterImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div className={s.movieGallery}>
      <ul className={s.movieList}>
        {movieList?.map((movie) => (
          <li key={movie.id} className={s.movieItem}>
            <Link to={`movies/${movie.id.toString()}`} state={location}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : defaultPosterImg
                }
                alt={movie.title}
                className={s.moviePoster}
              />
              <p className={s.movieTitle}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
