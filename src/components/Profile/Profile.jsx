import React from 'react';

import classes from './Profile.module.css';

export default function Profile(props) {
  return (
    <main className={classes.profile_wrapper}>
      <h1>Профиль</h1>

      <div className={classes.block}>
        <div className={classes.title}>
          <div className={classes.name}>
            <img className={classes.img} src={'./img/profile_pic.png'}></img>
            <h3>Имя Фамилия</h3>
          </div>
          <h4 className={classes.change}>Изменить</h4>
        </div>
        <div className={classes.profile_details}>
          <div className={classes.profile_detail}>
            <h4 className={classes.profile_datail__title}>Адрес</h4>
            <div className={classes.profile_datail__data}>
              <h4>г. Санкт-Петербург, пр. Невский, д. 1</h4>
            </div>
          </div>
          <div className={classes.profile_detail}>
            <h4 className={classes.profile_datail__title}>Email</h4>
            <div className={classes.profile_datail__data}>
              <h4>Ivan.ivanovich@mail.ru</h4>
            </div>
          </div>
          <div className={classes.profile_detail}>
            <h4 className={classes.profile_datail__title}>Телефон</h4>
            <div className={classes.profile_datail__data}>
              <h4>+7 (951) 342-54-99</h4>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.block}>
        <h3>Данные о покупках</h3>
        <div className={classes.orders_details}>
          <div className={classes.orders_detail}>
            <h4 className={classes.orders_datail__title}>599 750 &#8381;</h4>
            <div className={classes.orders_datail__data}>
              <h4>Сумма заказов</h4>
            </div>
          </div>
          <div className={classes.orders_detail}>
            <h4 className={classes.orders_datail__title}>2</h4>
            <div className={classes.orders_datail__data}>
              <h4>Количество заказов</h4>
            </div>
          </div>
          <div className={classes.orders_detail}>
            <h4 className={classes.orders_datail__title}>11 106 &#8381;</h4>
            <div className={classes.orders_datail__data}>
              <h4>Средняя стоимость заказа</h4>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.block}>
        <h3>Заказы</h3>
        <div className={classes.orders_list}>
          <div className={classes.order_card}>
            <h4 className={classes.order_number}>Заказ №0000001-0004</h4>
            <div className={classes.photos}>
              <img className={classes.img} src="./img/cup1.png"></img>
              <img className={classes.img} src="./img/cup2.png"></img>
              <img className={classes.img} src="./img/cup3.png"></img>
            </div>
            <h4 className={classes.status}>Собирается</h4>
          </div>
        </div>
      </div>
    </main>
  );
}
