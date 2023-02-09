import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Orders.module.css';

import OrderItem from './OrderItem/OrderItem';
import SvgSelector from '../../SvgSelector';

export default function Orders(props) {
  const [Orders, setOrders] = useState([]);
  const [OrdersInfo, setOrdersInfo] = useState([]);
  const [Items, setItems] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/orders/${props.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
    fetch('http://localhost:3001/orders_info')
      .then((response) => response.json())
      .then((data) => {
        setOrdersInfo(data);
      });
    fetch(`http://localhost:3001/items`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  Orders.forEach((el) => {
    Object.assign(el, { info: [] });
    for (let i = 0; i < OrdersInfo.length; i++) {
      Object.assign(OrdersInfo[i], { info: [] });
    }
  });
  Orders.forEach((el) => {
    for (let i = 0; i < OrdersInfo.length; i++) {
      if (OrdersInfo[i].id_order === el.id) {
        for (let j = 0; j < Items.length; j++) {
          if (Items[j].id === OrdersInfo[i].id_item) {
            el.info.push(Object.assign(OrdersInfo[i], { info: Items[j] }));
          }
        }
      }
    }
  });

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
          {Orders.map((item, index) => (
            <OrderItem key={index} props={item} userId={props.userId} />
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
