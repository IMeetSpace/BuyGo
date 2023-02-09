import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import SvgSelector from '../../SvgSelector';

export default function Header() {
  return (
    <header>
      <NavLink to="/" className={(data) => (data.isActive ? 'active' : '')}>
        <h2 className="logo">BuyGo</h2>
      </NavLink>
      <div className="search">
        <div className="catalog">
          <NavLink to="/catalog" className={(data) => (data.isActive ? 'active' : '')}>
            <SvgSelector id="menu" />
            <h4>Каталог</h4>
          </NavLink>
        </div>
        <div className="search-box">
          <input />
          <SvgSelector id="search" />
        </div>
      </div>
      <nav className="nav">
        <div className="nav-button">
          <NavLink to="/profile" className={(data) => (data.isActive ? 'active' : '')}>
            <SvgSelector id="profile" />
            Профиль
          </NavLink>
        </div>
        <div className="nav-button">
          <NavLink to="/orders" className={(data) => (data.isActive ? 'active' : '')}>
            <SvgSelector id="orders" />
            Заказы
          </NavLink>
        </div>
        <div className="nav-button">
          <NavLink to="/cart" className={(data) => (data.isActive ? 'active' : '')}>
            <SvgSelector id="cart" />
            Корзина
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
