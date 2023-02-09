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
    this.reset();
  }

  reset() {
    this.state = {
      login: '',
      password: '',
      userId: -1,
    };
  }
  updateLogin(evt) {
    this.setState({
      login: evt.target.value,
    });
  }
  updatePassword(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  searchUser = (login, password) => {
    fetch(`http://localhost:3001/users/${this.state.login}/${this.state.password}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userId: data[0].id });
      });
    if (this.state.userId !== -1) {
      alert(`Успешный вход с ID ${this.state.userId}`);
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/catalog" element={<Catalog userId={this.state.userId} />} />
            <Route path="/profile" element={<Profile userId={this.state.userId} />} />
            <Route path="/orders" element={<Orders userId={this.state.userId} />} />
            <Route path="/cart" element={<Cart userId={this.state.userId} />} />
            <Route
              path="/"
              element={
                <main>
                  <input
                    value={this.state.inputValue}
                    onChange={(data) => this.updateLogin(data)}></input>
                  <input
                    value={this.state.inputValue}
                    onChange={(data) => this.updatePassword(data)}></input>
                  <button
                    onClick={() => {
                      this.searchUser();
                    }}>
                    Войти
                  </button>
                </main>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
