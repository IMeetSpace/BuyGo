import React, { useState, useEffect } from 'react';

import classes from './Catalog.module.css';

import Card from './Card/Card';

export default function Catalog(props) {
  const [Catalog, setCatalog] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then((response) => response.json())
      .then((data) => {
        setCatalog(data);
      });
  }, []);
  return (
    <main className={classes.catalog_wrapper}>
      <h1>Каталог</h1>
      <div className={classes.content}>
        {Catalog.map((item, index) => (
          <Card key={index} props={item} userId={props.userId} />
        ))}
      </div>
    </main>
  );
}
