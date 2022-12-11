import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Orders.module.css';

import OrderItem from './OrderItem/OrderItem';
import SvgSelector from '../../SvgSelector';

export default function Orders(props) {
  let showAll = () => {
    return (
      <div className={classes.content_wrapper}>
        <div className={classes.title}>
          <h1>Заказы</h1>
          <div className={classes.filter}>
            Все
            <SvgSelector id="drop-down" />
          </div>
        </div>
        <div className={classes.content}>
          {props.orders.map((item, index) => (
            <OrderItem key={index} order={item} catalog={props.catalog} />
          ))}
        </div>
      </div>
    );
  };
  let showNothing = () => {
    return (
      <div className={classes.emptyOrders}>
        <h1>Заказов пока нет</h1>
        <NavLink to="/catalog" className={(data) => (data.isActive ? 'active' : '')}>
          <h4 className={classes.openCatalog}>Перейти в каталог</h4>
        </NavLink>
      </div>
    );
  };

  return <main className={classes.orders_wrapper}>{1 > 0 ? showAll() : showNothing()}</main>;
}
