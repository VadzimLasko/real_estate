import "./appHeader.sass";

//Это header
const AppHeader = () => {
  return (
    <header className="header">
      <div className="header__left-side">
        <a href="#" className="header__logo">
          Недвижимость
        </a>
        <nav className="header__navigation">
          <a href="#" className="header__navigation__item" tabIndex={0}>
            1 кнопка
          </a>
          <a href="#" className="header__navigation__item" tabIndex={0}>
            2 кнопка
          </a>
          <a href="#" className="header__navigation__item" tabIndex={0}>
            3 кнопка
          </a>
          <a href="#" className="header__navigation__item" tabIndex={0}>
            4 кнопка
          </a>
        </nav>
      </div>
      <div className="header__right-side">
        <button className="header__right-side__add-ad btn" type="button">
          <span>+</span> Добавить объявление
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
