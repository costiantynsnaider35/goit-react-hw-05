import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Header.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
