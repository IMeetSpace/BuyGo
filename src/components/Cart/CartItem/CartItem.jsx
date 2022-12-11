import React from 'react';

import classes from './CartItem.module.css';
import SvgSelector from '../../../SvgSelector';

export default function CartItem(props) {
  return (
    <div className={classes.item}>
      <img className={classes.img} src={`./img/${props.props.info.img}`}></img>
      <div className={classes.info}>
        <div className={classes.main}>
          <div className={classes.name}>
            <h3 className={classes.title}>{props.props.info.title}</h3>
            <h4 className={classes.maker}>{props.props.info.maker}</h4>
          </div>
          <div className={classes.counter_wrapper}>
            <div className={classes.counter}>
              <div
                className={props.props.amount > 50 ? classes.minus : classes.minus_off}
                onClick={() => {
                  // Уменьшение количества
                }}>
                <SvgSelector id="minus" />
              </div>
              <h3 className={classes.count}>{props.props.amount}</h3>
              <div
                className={props.props.amount < 500 ? classes.plus : classes.plus_off}
                onClick={() => {
                  // Увеличение количества
                }}>
                <SvgSelector id="plus" />
              </div>
            </div>
            <span
              onClick={() => {
                // Удаление из корзины
              }}>
              Удалить
            </span>
          </div>
        </div>
        <div className={classes.meta}>
          <h4 className={classes.price}>{props.props.info.price} &#8381;</h4>
          <h4 className={classes.full_price}>
            {parseInt(props.props.info.price * props.props.amount).toLocaleString()} &#8381;
          </h4>
        </div>
      </div>
    </div>
  );
}
