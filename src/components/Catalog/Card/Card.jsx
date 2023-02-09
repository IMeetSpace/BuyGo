import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Card.module.css';
import SvgSelector from '../../../SvgSelector';

export default function Card(props) {
  const [Cart, setCart] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/cart/${props.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      });
  }, []);

  function addToCart(id_buyer, id_item, amount) {
    fetch('http://localhost:3001/cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_buyer, id_item, amount }),
    })
      .then((res) => res.json())
      .then((item) => {
        const copy = [...Cart];
        copy.push(item[0]);
        setCart(copy);
      });
  }

  let isInCart = false;

  Cart.forEach((el) => {
    if (el.id_item === props.props.id) {
      isInCart = true;
    }
  });
  let inCart = () => {
    if (!isInCart) {
      return (
        <div
          className={classes.addToCart}
          onClick={() => {
            addToCart(props.userId, props.props.id, 50);
          }}>
          <SvgSelector id={'plus'} />
        </div>
      );
    } else {
      return (
        <NavLink to="/cart" className={classes.goToCart}>
          <SvgSelector id={'cart'} />
        </NavLink>
      );
    }
  };

  let rating = [];

  for (let i = 0; i < props.props.rating; i++) {
    rating.push(<SvgSelector key={`${i} active`} id="star" active={classes.active} />);
  }
  for (let i = 0; i < 5 - props.props.rating; i++) {
    rating.push(<SvgSelector key={`${i}`} id="star" />);
  }

  return (
    <div className={classes.card}>
      <img className={classes.img} src={'./img/' + props.props.img}></img>
      <h3 className={classes.price}>{props.props.price.toLocaleString()} &#8381;</h3>
      <div className={classes.data}>
        <div className={classes.title}>{props.props.title}</div>
        <div className={classes.maker}>{props.props.maker}</div>
      </div>
      <div className={classes.rating}>{rating}</div>
      {inCart()}
    </div>
  );
}
