import React, { useState } from 'react';

import classes from './OrderItem.module.css';
import SvgSelector from '../../../SvgSelector';

export default function OrderItem(props) {
  let full_price = 0;
  const [isClosed, setIsClosed] = useState(false);
  const onClick = () => {
    setIsClosed(!isClosed);
  };
  let photos = [];

  for (let i = 0; i < props.props.info.length; i++) {
    if (i > 2) {
      break;
    }
    photos.push(<img className={classes.img} src={`./img/${props.props.info[i].info.img}`}></img>);
  }

  if (!isClosed) {
    return (
      <div className={classes.item} onClick={onClick}>
        <div className={classes.title}>
          <h3>
            Заказ №{props.props.id_buyer.toString().padStart(6, '0')}-
            {props.props.id.toString().padStart(6, '0')}
          </h3>
          <div className={classes.meta}>
            <h4 className={classes.date}>
              Дата заказа: {props.props.order_date.toString().split('T')[0]}
            </h4>
            <h4 className={classes.status}>{props.props.status}</h4>
          </div>
        </div>
        <div className={classes.photos}>{photos}</div>
      </div>
    );
  } else {
    return (
      <div className={`${classes.item} ${isClosed ? classes.item_active : ''}`} onClick={onClick}>
        <div className={classes.title}>
          <h3>
            Заказ №{props.props.id_buyer.toString().padStart(6, '0')}-
            {props.props.id.toString().padStart(6, '0')}
          </h3>
          <div className={classes.meta}>
            <h4 className={classes.date}>
              Дата заказа: {props.props.order_date.toString().split('T')[0]}
            </h4>
            <h4 className={classes.status}>{props.props.status}</h4>
          </div>
        </div>
        <div className={classes.order_items}>
          {props.props.info.map((el) => {
            full_price += el.info.price * el.amount;
            return (
              <div className={classes.order_item}>
                <img className={classes.img} src={`./img/${el.info.img}`}></img>
                <div className={classes.order_item__meta}>
                  <h4 className={classes.name}>{el.info.title}</h4>
                  <h4 className={classes.pricing}>
                    {el.info.price} &#8381; * {el.amount} ={' '}
                    {(el.info.price * el.amount).toLocaleString()} &#8381;
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
        <h4 className={classes.full_price}>
          Общая стоимость заказа: {full_price.toLocaleString()} &#8381;
        </h4>
      </div>
    );
  }
}
