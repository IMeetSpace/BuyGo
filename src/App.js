import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Catalog from './components/Catalog/Catalog';
import Profile from './components/Profile/Profile';
import Orders from './components/Orders/Orders';
import Cart from './components/Cart/Cart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalog: [
        {
          id: 1,
          title: 'Кружка новогодняя 1',
          maker: 'Good Holidays',
          img: 'cup1.png',
          category: 1,
          price: 111,
          rating: 1,
        },
        {
          id: 2,
          title: 'Кружка новогодняя 2',
          maker: 'Good Holidays',
          img: 'cup2.png',
          category: 1,
          price: 222,
          rating: 2,
        },
        {
          id: 3,
          title: 'Кружка новогодняя 3',
          maker: 'Good Holidays',
          img: 'cup3.png',
          category: 1,
          price: 333,
          rating: 3,
        },
        {
          id: 4,
          title: 'Кружка новогодняя 4',
          maker: 'Good Holidays',
          img: 'cup4.png',
          category: 1,
          price: 444,
          rating: 4,
        },
        {
          id: 5,
          title: 'Носки новогодние',
          maker: 'Good Holidays',
          img: 'socks1.png',
          category: 2,
          price: 555,
          rating: 5,
        },
      ],
      cart: [
        {
          id: 1,
          title: 'Кружка новогодняя 1',
          maker: 'Good Holidays',
          img: 'cup1.png',
          category: 1,
          price: 111,
          rating: 1,
          count: 50,
        },
        {
          id: 2,
          title: 'Кружка новогодняя 2',
          maker: 'Good Holidays',
          img: 'cup2.png',
          category: 1,
          price: 222,
          rating: 2,
          count: 50,
        },
      ],
      orders: [
        {
          id: 1,
          id_buyer: 1,
          id_delivery: 1,
          date: '9/12/2022',
          status: 'Отправлено',
          info: [
            {
              id: 1,
              id_order: 1,
              id_catalog: 1,
              count: 50,
            },
            {
              id: 2,
              id_order: 1,
              id_catalog: 2,
              count: 100,
            },
          ],
        },
        {
          id: 2,
          id_buyer: 1,
          id_delivery: 1,
          date: '10/12/2022',
          status: 'Собирается',
          info: [
            {
              id: 3,
              id_order: 2,
              id_catalog: 3,
              count: 100,
            },
          ],
        },
      ],
    };
    this.isInCart = this.isInCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.updateCartCount = this.updateCartCount.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
  }
  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route
              path="/catalog"
              element={
                <Catalog
                  items={this.state.catalog}
                  isInCart={this.isInCart}
                  addToCart={this.addToCart}
                />
              }
            />
            <Route path="/profile" element={<Profile props={this.state.orders} />} />
            <Route
              path="/orders"
              element={<Orders orders={this.state.orders} catalog={this.state.catalog} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  items={this.state.cart}
                  deleteFromCart={this.deleteFromCart}
                  updateCartCount={this.updateCartCount}
                />
              }
            />
            <Route path="/" element={<main />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }

  isInCart(item) {
    let isInArray = false;
    this.state.cart.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    return isInArray;
  }

  addToCart(item, count) {
    if (!this.isInCart(item)) {
      this.setState({
        cart: [
          ...this.state.cart,
          {
            id: item.id,
            title: item.title,
            maker: item.maker,
            img: item.img,
            category: item.category,
            price: item.price,
            rating: item.rating,
            count: count,
          },
        ],
      });
    }
  }

  updateCartCount(item, count) {
    let list = this.state.cart;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === item.id) {
        list[i].count = Math.max(50, Math.min(500, count));
      }
    }
    this.setState({ cart: list });
  }

  deleteFromCart(item) {
    this.setState({ cart: this.state.cart.filter((el) => el.id !== item.id) });
  }
}

export default App;
