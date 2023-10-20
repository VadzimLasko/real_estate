import { TextField } from "@mui/material";

import "./appHeader.sass";

const AppHeader = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-container__left">
          <div className="header-container__logo">
            <a href="#" className="logo">
              НЕДВИЖИМОСТЬ
              <img src="icons/logo.svg" alt="logo" className="logo__img" />
            </a>
          </div>
          <div className="header-container__filter-btns">
            <button className="btn-1">1 кнопка</button>
            <button className="btn-2">2 кнопка</button>
            <button className="btn-3">3 кнопка</button>
            <button className="btn-4">4 кнопка</button>
          </div>
        </div>
        <div className="header-container__right">
          <div className="header-container__search-panel">
            <TextField placeholder="Найти" size="medium" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
