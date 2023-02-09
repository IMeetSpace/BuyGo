import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <NavLink to="/" className={(data) => (data.isActive ? 'active' : '')}>
        <h2 className="logo">BuyGo</h2>
      </NavLink>
      <ul className="about">
        <li>О компании</li>
        <li>Реквизиты</li>
        <li>Контакты</li>
      </ul>
      <p className="trademark">
        <span>&copy; 1998 – 2022 ООО «BuyGo». &nbsp;</span>
        <span>Все права защищены.</span>
      </p>
    </footer>
  );
}
