import "./appHeader.sass";

const AppHeader = () => {
  return (
    <header className="header">
      <div className="header__left-side">
        <a href="#" className="header__logo">
          Недвижимость
        </a>
        <div className="header__navigation">
          <a className="btn-item" tabIndex={0}>
            1 кнопка
          </a>
          <a className="btn-item" tabIndex={0}>
            2 кнопка
          </a>
          <a className="btn-item" tabIndex={0}>
            3 кнопка
          </a>
          <a className="btn-item" tabIndex={0}>
            4 кнопка
          </a>
        </div>
      </div>
      <div className="header__right-side search-panel">
        <input className="search-panel" placeholder="Найти" size="medium" />
      </div>
    </header>
  );
};

export default AppHeader;
