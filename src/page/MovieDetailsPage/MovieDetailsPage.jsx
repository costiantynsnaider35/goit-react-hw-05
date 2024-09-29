import { Suspense, useEffect, useRef, useState } from "react";
import { fetchMovieById } from "../../services/tmdb";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");
  const defaultPosterImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  useEffect(() => {
    const getMovieDetail = async () => {
      const data = await fetchMovieById(movieId);
      setMovieDetail(data);
    };
    getMovieDetail();
  }, [movieId]);

  if (!movieDetail) return <h2>{<Loader />}</h2>;

  return (
    <div className={s.movieDetails}>
      <Link to={goBackRef.current} className={s.backLink}>
        Go back
      </Link>
      <div className={s.movieInfo}>
        <img
          src={
            movieDetail.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`
              : defaultPosterImg
          }
          alt={movieDetail.title}
          className={s.poster}
        />
        <div>
          <h1 className={s.infoTitle}>{movieDetail.title}</h1>
          <p className={s.title}>Popularity: {movieDetail.popularity}</p>
          <h2>Overview</h2>
          <p className={s.title}>{movieDetail.overview}</p>
          <div className={s.genres}>
            <h3>Genres</h3>
            <p>{movieDetail.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      </div>
      <div className={s.navLink}>
        <NavLink to="cast" className={`${s.link} ${s.navLink}`}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={`${s.link} ${s.navLink}`}>
          Reviews
        </NavLink>
      </div>
      <div className={s.outlet}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
