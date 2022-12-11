import React from 'react';

import classes from './CartItem.module.css';
import SvgSelector from '../../../SvgSelector';

export default function CartItem(props) {
  let price = props.props.price * props.props.count;
  return (
    <div className={classes.item}>
      <img className={classes.img} src={'./img/' + props.props.img}></img>
      <div className={classes.info}>
        <div className={classes.main}>
          <div className={classes.name}>
            <h3 className={classes.title}>{props.props.title}</h3>
            <h4 className={classes.maker}>{props.props.maker}</h4>
          </div>
          <div className={classes.counter_wrapper}>
            <div className={classes.counter}>
              <div
                className={props.props.count > 50 ? classes.minus : classes.minus_off}
                onClick={() => {
                  props.updateCartCount(props.props, props.props.count - 50);
                }}>
                <SvgSelector id="minus" />
              </div>
              <h3 className={classes.count}>{props.props.count}</h3>
              <div
                className={props.props.count < 500 ? classes.plus : classes.plus_off}
                onClick={() => {
                  props.updateCartCount(props.props, props.props.count + 50);
                }}>
                <SvgSelector id="plus" />
              </div>
            </div>
            <span
              onClick={() => {
                props.deleteFromCart(props.props);
              }}>
              Удалить
            </span>
          </div>
        </div>
        <div className={classes.meta}>
          <h4 className={classes.price}>{props.props.price} &#8381;</h4>
          <h4 className={classes.full_price}>{price.toLocaleString()} &#8381;</h4>
        </div>
      </div>
    </div>
  );
}
