import { Link, NavLink } from "react-router-dom";
import "./appHeader.sass";

//Это header
const AppHeader = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          Недвижимость
        </Link>
        <nav className="header__navigation">
          <NavLink
            to="/login"
            className="header__navigation__item"
            tabIndex={0}
          >
            Войти
          </NavLink>
          <NavLink
            to="/register"
            className="header__navigation__item"
            tabIndex={0}
          >
            Зарегистрироваться
          </NavLink>
          <Link className="header__add-ad" to="/ad/create" tabIndex={0}>
            <button className="header__add-ad btn" type="button">
              <span>+</span> Добавить объявление
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader; //TODO не забудь добавить кнопки редактирования профиля и объявления
