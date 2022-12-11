import React, { useState } from 'react';

import classes from './OrderItem.module.css';
import SvgSelector from '../../../SvgSelector';

export default function OrderItem(props) {
  const [isClosed, setIsClosed] = useState(false);
  const onClick = () => {
    setIsClosed(!isClosed);
  };
  let photos = [];

  for (let i = 0; i < props.order.info.length; i++) {
    if (i > 2) {
      break;
    }
    photos.push(<img className={classes.img} src="./img/cup1.png"></img>);
  }

  if (!isClosed) {
    return (
      <div className={classes.item} onClick={onClick}>
        <div className={classes.title}>
          <h3>
            Заказ №{props.order.id_buyer.toString().padStart(7, '0')}-
            {props.order.id.toString().padStart(4, '0')}
          </h3>
          <div className={classes.meta}>
            <h4 className={classes.date}>Дата заказа: {props.order.date}</h4>
            <h4 className={classes.status}>{props.order.status}</h4>
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
            Заказ №{props.order.id_buyer.toString().padStart(7, '0')}-
            {props.order.id.toString().padStart(4, '0')}
          </h3>
          <div className={classes.meta}>
            <h4 className={classes.date}>Дата заказа: {props.order.date}</h4>
            <h4 className={classes.status}>{props.order.status}</h4>
          </div>
        </div>
        <div className={classes.order_items}>
          {props.order.info.map((el) => (
            <div className={classes.order_item}>
              <img className={classes.img} src={'./img/cup1.png'}></img>
              <div className={classes.order_item__meta}>
                <h4 className={classes.name}>Название</h4>
                <h4 className={classes.pricing}>цена * {el.count} = 1 000 000 &#8381;</h4>
              </div>
            </div>
          ))}
        </div>
        <h4 className={classes.full_price}>Общая стоимость заказа: 555 &#8381;</h4>
      </div>
    );
  }
}
