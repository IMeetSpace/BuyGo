import React from 'react';

import classes from './Catalog.module.css';

import Card from './Card/Card';

export default function Catalog(props) {
  return (
    <main className={classes.catalog_wrapper}>
      <h1>Каталог</h1>
      <div className={classes.content}>
        {props.items.map((item, index) => (
          <Card key={index} props={item} isInCart={props.isInCart} addToCart={props.addToCart} />
        ))}
      </div>
    </main>
  );
}
