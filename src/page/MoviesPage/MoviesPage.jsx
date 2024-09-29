import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useMemo, useState } from "react";
import { fetchSearchByQuery } from "../../services/tmdb";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [searchQuery, setSearchQuery] = useState([]);
  const location = useLocation();
  const defaultPosterImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  useEffect(() => {
    const getSearchQuery = async () => {
      const data = await fetchSearchByQuery(query);
      setSearchQuery(data);
    };
    getSearchQuery();
  }, [query]);

  const handleChange = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }

    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  const searchMovie = useMemo(
    () =>
      searchQuery?.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      ),
    [query, searchQuery]
  );

  return (
    <div className={s.pageGallery}>
      <SearchBar handleChange={handleChange} />
      <ul className={s.pageList}>
        {searchMovie?.map((movie) => (
          <li key={movie.id} className={s.pageItem}>
            <Link to={`${movie.id.toString()}`} state={location}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : defaultPosterImg
                }
                alt={movie.title}
                className={s.pagePoster}
              />
              <p className={s.pageTitle}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default MoviesPage;
