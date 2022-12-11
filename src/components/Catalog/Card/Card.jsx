import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Card.module.css';
import SvgSelector from '../../../SvgSelector';

export default function Card(props) {
  let rating = [];

  for (let i = 0; i < props.props.rating; i++) {
    rating.push(<SvgSelector id="star" active={classes.active} />);
  }
  for (let i = 0; i < 5 - props.props.rating; i++) {
    rating.push(<SvgSelector id="star" />);
  }

  let inCart = () => {
    return (
      <div
        className={classes.addToCart}
        onClick={() => {
          props.addToCart(props.props, 50);
        }}>
        <SvgSelector id={'plus'} />
      </div>
    );
  };

  let notInCart = () => {
    return (
      <NavLink to="/cart" className={classes.goToCart}>
        <SvgSelector id={'cart'} />
      </NavLink>
    );
  };

  return (
    <div className={classes.card}>
      <img className={classes.img} src={'./img/' + props.props.img}></img>
      <h3 className={classes.price}>{props.props.price} &#8381;</h3>
      <div className={classes.data}>
        <div className={classes.title}>{props.props.title}</div>
        <div className={classes.maker}>{props.props.maker}</div>
      </div>
      <div className={classes.rating}>{rating}</div>
      {!props.isInCart(props.props) ? inCart() : notInCart()}
    </div>
  );
}
