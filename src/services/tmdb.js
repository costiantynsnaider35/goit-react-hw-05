import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE1YzRhMDBiYmM3Y2FjMGFmY2Q3MzNmZWYzYWU2MyIsIm5iZiI6MTcyNzUyMzA5My4xNTc3MDksInN1YiI6IjY1YTJhNGVlMjM4NTEzMDEyNTYyNzc4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EaBwyQE6vvLb_yYU80pzH0pra8aPnxdbOvTzsIw62zg",
  },
};
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

export const fetchMovieList = async () => {
  const { data } = await axios.get(
    "trending/movie/day?language=en-US",
    options
  );

  return data.results;
};

export const fetchMovieById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`, options);
  return data;
};

export const fetchCastById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/credits`, options);
  return data.cast;
};

export const fetchReviewsById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/reviews`, options);
  return data.results;
};

export const fetchSearchByQuery = async (query) => {
  const { data } = await axios.get(
    `search/movie?query=${query}&page=1`,
    options
  );
  return data.results;
};
