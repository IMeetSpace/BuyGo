import React, { useState, useEffect } from 'react';

import classes from './CartItem.module.css';
import SvgSelector from '../../../SvgSelector';

export default function CartItem(props) {
  const [CartItem, setCartItem] = useState({ id: -1 });
  const [ItemInfo, setItemInfo] = useState([]);
  useEffect(() => {
    setItemInfo(props.props.info);
    setCartItem(props.props);
  }, []);

  function setAmount(id_buyer, id_item, amount) {
    fetch('http://localhost:3001/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_buyer, id_item, amount }),
    })
      .then((res) => res.json())
      .then((item) => {
        setCartItem(Object.assign(item[0], { info: ItemInfo }));
      });
  }
  function deleteFromCart(id_buyer, id_item) {
    setCartItem({ id: -1 });
    fetch('http://localhost:3001/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_buyer, id_item }),
    })
      .then((res) => res.json())
      .then((item) => {
        setCartItem({ id: -1 });
      });
    console.log(CartItem);
  }
  if (CartItem.id !== -1) {
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
                  className={CartItem.amount > 50 ? classes.minus : classes.minus_off}
                  onClick={() => {
                    if (CartItem.amount > 50) {
                      props.props.amount -= 50;
                      setAmount(1, CartItem.id_item, CartItem.amount - 50);
                    }
                  }}>
                  <SvgSelector id="minus" />
                </div>
                <h3 className={classes.count}>{CartItem.amount}</h3>
                <div
                  className={CartItem.amount < 500 ? classes.plus : classes.plus_off}
                  onClick={() => {
                    if (CartItem.amount < 500) {
                      props.props.amount += 50;
                      setAmount(1, CartItem.id_item, CartItem.amount + 50);
                    }
                  }}>
                  <SvgSelector id="plus" />
                </div>
              </div>
              <span
                onClick={() => {
                  deleteFromCart(1, CartItem.id_item);
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
  } else {
    return <></>;
  }
}
