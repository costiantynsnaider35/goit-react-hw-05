import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovieList } from "../../services/tmdb";

const HomePage = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovieList = async () => {
      const data = await fetchMovieList();
      setMovieList(data);
    };
    getMovieList();
  }, []);

  return (
    <div>
      <h2>Trending Movie Today</h2>
      <MovieList movieList={movieList} />
    </div>
  );
};

export default HomePage;
