import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsById } from "../../services/tmdb";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviewsById(movieId);
      setMovieReviews(data);
    };
    getReviews();
  }, [movieId]);

  if (!movieReviews.length) {
    return <h2>We don`t have any reviews for this movie!</h2>;
  }

  return (
    <div className={s.reviews}>
      <ul className={s.reviewsList}>
        {movieReviews?.map((review) => (
          <li className={s.reviewsItem} key={review.id}>
            <h3 className={s.reviewsAuthor}>{review.author}</h3>
            <p className={s.reviewsContent}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
