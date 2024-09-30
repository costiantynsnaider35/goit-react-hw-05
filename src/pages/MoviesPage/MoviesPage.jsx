import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { fetchSearchByQuery } from "../../services/tmdb";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    const getSearchQuery = async () => {
      const data = await fetchSearchByQuery(query);

      const searchMovie = data?.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchQuery(searchMovie);
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

  return (
    <div className={s.MovieList}>
      <SearchBar handleChange={handleChange} />
      <MovieList movieList={searchQuery} />
    </div>
  );
};

export default MoviesPage;
