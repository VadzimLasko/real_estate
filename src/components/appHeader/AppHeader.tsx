import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

import { useGetUsersQuery } from "@/api/authApiSlice";
import { useTypedSelector } from "@/store";
import { removeCurrentUser } from "@/store/slices/userSlice";

import "./appHeader.sass";

const AppHeader = () => {
  useGetUsersQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useTypedSelector((state) => state.user);

  const logout = () => {
    dispatch(removeCurrentUser());
    navigate("/");
  };

  const renderBtns = () => {
    return (
      <>
        {!currentUser ? (
          <>
            <NavLink
              to="/login"
              className="header__navigation__item mr"
              tabIndex={0}
            >
              Войти
            </NavLink>
            <NavLink
              to="/register"
              className="header__navigation__item mr"
              tabIndex={0}
            >
              Зарегистрироваться
            </NavLink>
          </>
        ) : null}
        {currentUser ? (
          <>
            <NavLink
              to="/user/favorites"
              className="header__navigation__item mr"
              tabIndex={0}
            >
              Понравившееся
            </NavLink>
            <NavLink
              to="/user/created"
              className="header__navigation__item mr"
              tabIndex={0}
            >
              Мои объявления
            </NavLink>
            <NavLink
              to={`/user/${currentUser.id}`}
              className="header__navigation__item mr"
              tabIndex={0}
            >
              Мой профиль
            </NavLink>
          </>
        ) : null}
        <Link className="header__add-ad mr" to="/ad/create" tabIndex={0}>
          <button className="header__add-ad btn" type="button">
            <span>+</span> Добавить объявление
          </button>
        </Link>
        {currentUser ? (
          <>
            <button
              onClick={() => logout()}
              className="header__navigation__item button"
              tabIndex={0}
            >
              Выйти
            </button>
          </>
        ) : null}
      </>
    );
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          Real Estate
        </Link>
        <nav id="appHeader" className="header__navigation">
          {renderBtns()}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
