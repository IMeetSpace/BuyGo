import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Catalog from './components/Catalog/Catalog';
import Profile from './components/Profile/Profile';
import Orders from './components/Orders/Orders';
import Cart from './components/Cart/Cart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<main />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
