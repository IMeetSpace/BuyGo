import React, { useState, useEffect } from 'react';

import classes from './Profile.module.css';

export default function Profile(props) {
  let full_price = 0;
  let orders_count = 0;

  const [profile, setProfile] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [OrdersInfo, setOrdersInfo] = useState([]);
  const [Items, setItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/users/1')
      .then((response) => response.json())
      .then((data) => {
        setProfile(data[0]);
      });
    fetch('http://localhost:3001/orders/1')
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
    orders_count += 1;
    for (let i = 0; i < OrdersInfo.length; i++) {
      if (OrdersInfo[i].id_order === el.id) {
        for (let j = 0; j < Items.length; j++) {
          if (Items[j].id === OrdersInfo[i].id_item) {
            full_price += Items[j].price * OrdersInfo[i].amount;
            el.info.push(Object.assign(OrdersInfo[i], { info: Items[j] }));
          }
        }
      }
    }
  });

  return (
    <main className={classes.profile_wrapper}>
      <h1>Профиль</h1>

      <div className={classes.block}>
        <div className={classes.title}>
          <div className={classes.name}>
            <img className={classes.img} src={'./img/profile_pic.png'}></img>
            <h3>{profile.naming}</h3>
          </div>
          <h4 className={classes.change}>Изменить</h4>
        </div>
        <div className={classes.profile_details}>
          <div className={classes.profile_detail}>
            <h4 className={classes.profile_datail__title}>Адрес</h4>
            <div className={classes.profile_datail__data}>
              <h4>{profile.address}</h4>
            </div>
          </div>
          <div className={classes.profile_detail}>
            <h4 className={classes.profile_datail__title}>Email</h4>
            <div className={classes.profile_datail__data}>
              <h4>{profile.mail}</h4>
            </div>
          </div>
          <div className={classes.profile_detail}>
            <h4 className={classes.profile_datail__title}>Телефон</h4>
            <div className={classes.profile_datail__data}>
              <h4>{profile.phone}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.block}>
        <h3>Данные о покупках</h3>
        <div className={classes.orders_details}>
          <div className={classes.orders_detail}>
            <h4 className={classes.orders_datail__title}>{full_price.toLocaleString()} &#8381;</h4>
            <div className={classes.orders_datail__data}>
              <h4>Сумма заказов</h4>
            </div>
          </div>
          <div className={classes.orders_detail}>
            <h4 className={classes.orders_datail__title}>{orders_count.toLocaleString()}</h4>
            <div className={classes.orders_datail__data}>
              <h4>Количество заказов</h4>
            </div>
          </div>
          <div className={classes.orders_detail}>
            <h4 className={classes.orders_datail__title}>
              {parseInt(full_price / orders_count).toLocaleString()} &#8381;
            </h4>
            <div className={classes.orders_datail__data}>
              <h4>Средняя стоимость заказа</h4>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.block}>
        <h3>Заказы</h3>
        <div className={classes.orders_list}>
          {Orders.map((item, index) => (
            <div className={classes.order_card}>
              <h4 className={classes.order_number}>
                Заказ №{item.id_buyer.toString().padStart(6, '0')}-
                {item.id.toString().padStart(6, '0')}
              </h4>
              <div className={classes.photos}>
                <img
                  className={classes.img}
                  src={item.info.length > 0 ? `./img/${item.info[0].info.img}` : ''}></img>
                <img
                  className={classes.img}
                  src={item.info.length > 0 ? `./img/${item.info[1].info.img}` : ''}></img>
                <img
                  className={classes.img}
                  src={item.info.length > 0 ? `./img/${item.info[2].info.img}` : ''}></img>
              </div>
              <h4 className={classes.status}>{item.status}</h4>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
