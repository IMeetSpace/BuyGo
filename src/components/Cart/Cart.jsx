import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Cart.module.css';

import CartItem from './CartItem/CartItem';
import SvgSelector from '../../SvgSelector';

export default function Cart(props) {
  let full_price = 0;
  let full_count = 0;
  let showAll = () => {
    props.items.forEach((el) => (full_price += el.price * el.count));
    props.items.forEach((el) => (full_count += el.count));
    return (
      <div className={classes.content_wrapper}>
        <h1>Корзина</h1>
        <div className={classes.content}>
          <div className={classes.items}>
            {props.items.map((item, index) => (
              <CartItem
                key={index}
                props={item}
                deleteFromCart={props.deleteFromCart}
                updateCartCount={props.updateCartCount}
              />
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
                <h4 className={classes.text}>г. Санкт-Петербург, пр. Невский, д. 1</h4>
              </div>
              <div className={classes.order_detail}>
                <h4 className={classes.title}>Email</h4>
                <h4 className={classes.text}>Ivan.ivanovich@mail.ru</h4>
              </div>
              <div className={classes.order_detail}>
                <h4 className={classes.title}>Телефон</h4>
                <h4 className={classes.text}>+7 (951) 342-54-99</h4>
              </div>
              <div className={classes.delivery}>
                Обычная доставка
                <SvgSelector id="drop-down" />
              </div>
            </div>
            <div className={classes.buy_button}>
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
    <main className={classes.cart_wrapper}>
      {props.items.length > 0 ? showAll() : showNothing()}
    </main>
  );
}
