import s from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={s.container}>
      <h1 className={s.errorCode}>404</h1>
      <p className={s.message}>
        Oops! The page you are looking for does not exist!
      </p>
      <p className={s.suggestion}>
        Please check the URL or return to the homepage!
      </p>
    </div>
  );
};

export default NotFound;
