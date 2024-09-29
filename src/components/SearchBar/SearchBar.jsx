import { Formik, Form, Field } from "formik";
import s from "./SearchBar.module.css";

const SearchBar = ({ handleChange }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    handleChange(values.query);
  };

  return (
    <div className={s.searchContainer}>
      <div className={s.search}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={s.searchForm}>
            <Field
              name="query"
              placeholder="Enter movie title"
              className={s.searchInput}
            />
            <button className={s.searchBtn} type="submit">
              Search movie
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SearchBar;
