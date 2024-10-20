import React from 'react';
import Cart from './Cart';

function Header({ cart, removeFromCart }) {
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="./public/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <Cart cart={cart} removeFromCart={removeFromCart} />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
