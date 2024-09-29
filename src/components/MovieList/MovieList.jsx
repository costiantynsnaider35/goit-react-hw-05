import { useEffect } from "react";
import { useState } from "react";
import { fetchMovieList } from "../../services/tmdb";
import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const location = useLocation();
  const defaultPosterImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  useEffect(() => {
    const getMovieList = async () => {
      const data = await fetchMovieList();
      setMovieList(data);
    };
    getMovieList();
  }, []);

  return (
    <div className={s.movieGallery}>
      <h2>Trending Movie Today</h2>
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
