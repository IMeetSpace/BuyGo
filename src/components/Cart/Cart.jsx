import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Cart.module.css';

import CartItem from './CartItem/CartItem';
import SvgSelector from '../../SvgSelector';

export default function Cart(props) {
  let full_price = 0;
  let full_count = 0;

  const [profile, setProfile] = useState([]);
  const [Cart, setCart] = useState([]);
  const [Items, setItems] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/users/${props.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data[0]);
      });
    fetch(`http://localhost:3001/cart/${props.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      });
    fetch(`http://localhost:3001/items`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  Cart.forEach((el) => {
    Object.assign(el, { info: [] });
  });
  Cart.forEach((el) => {
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].id === el.id_item) {
        el.info.push(Object.assign(el, { info: Items[i] }));
      }
    }
  });

  let addOrdersInfo = () => {};

  let showAll = () => {
    Cart.forEach((el) => (full_price += el.info.price * el.amount));
    Cart.forEach((el) => (full_count += el.amount));
    return (
      <div className={classes.content_wrapper}>
        <h1>Корзина</h1>
        <div className={classes.content}>
          <div className={classes.items}>
            {Cart.map((item, index) => (
              <CartItem key={index} props={item} />
            ))}
          </div>
          <div className={classes.details}>
            <div className={classes.info}>
              <div className={classes.price}>
                <h3>Итого</h3>
                <h3>{full_price.toLocaleString()} &#8381;</h3>
              </div>
              <div className={classes.count}>
                <h4>Товары</h4>
                <h4>{full_count.toLocaleString()} шт.</h4>
              </div>
            </div>
            <div className={classes.buyer_info}>
              <div className={classes.order_detail}>
                <h4 className={classes.title}>Адрес</h4>
                <h4 className={classes.text}>{profile.address}</h4>
              </div>
              <div className={classes.order_detail}>
                <h4 className={classes.title}>Email</h4>
                <h4 className={classes.text}>{profile.mail}</h4>
              </div>
              <div className={classes.order_detail}>
                <h4 className={classes.title}>Телефон</h4>
                <h4 className={classes.text}>{profile.phone}</h4>
              </div>
              <div className={classes.delivery}>
                Обычная доставка
                <SvgSelector id="drop-down" />
              </div>
            </div>
            <div
              className={classes.buy_button}
              onClick={() => {
                fetch('http://localhost:3001/orders/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id_buyer: 1,
                    id_delivery: 1,
                    order_date: new Date(),
                    id_status: 1,
                  }),
                });
                Cart.map((el) => {
                  console.log(el);
                  fetch('http://localhost:3001/orders_info/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      id_item: el.id_item,
                      amount: el.amount,
                    }),
                  });
                });
                fetch('http://localhost:3001/cart', {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ id_buyer: 1 }),
                })
                  .then((res) => res.json())
                  .then((item) => {
                    setCart([]);
                  });
              }}>
              <h3>Заказать</h3>
            </div>
          </div>
        </div>
      </div>
    );
  };
  let showNothing = () => {
    return (
      <div className={classes.emptyCart}>
        <h1>Корзина пуста</h1>
        <NavLink to="/catalog" className={(data) => (data.isActive ? 'active' : '')}>
          <h4 className={classes.openCatalog}>Перейти в каталог</h4>
        </NavLink>
      </div>
    );
  };
  return (
    <main className={classes.cart_wrapper}>{Cart.length > 0 ? showAll() : showNothing()}</main>
  );
}
