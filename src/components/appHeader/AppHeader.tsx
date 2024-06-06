import { Link, NavLink } from "react-router-dom";
import "./appHeader.sass";

//Это header
const AppHeader = () => {
  return (
    <header className="header">
      <div className="header__left-side">
        <Link to="/" className="header__logo">
          Недвижимость
        </Link>
        <nav className="header__navigation">
          <NavLink to="/" className="header__navigation__item" tabIndex={0}>
            1 кнопка
          </NavLink>
          <NavLink to="/" className="header__navigation__item" tabIndex={0}>
            2 кнопка
          </NavLink>
          <NavLink to="/" className="header__navigation__item" tabIndex={0}>
            3 кнопка
          </NavLink>
          <NavLink to="/" className="header__navigation__item" tabIndex={0}>
            4 кнопка
          </NavLink>
        </nav>
      </div>
      <ul className="header__right-side">
        <li><Link to="/login">Войти  </Link></li>
        <li><Link to="/register">Зарегистрироваться</Link></li>
        <li><Link to="/ad/:slug/edit">Редактирование объявления  </Link></li>
        <li><Link to="/user/:slug">Редактирование профиля</Link></li>
        <li><Link to="/ad/create">
          <button className="header__right-side__add-ad btn" type="button">
            <span>+</span> Добавить объявление
          </button>
        </Link></li>
      </ul>
    </header>
  );
};

export default AppHeader;
