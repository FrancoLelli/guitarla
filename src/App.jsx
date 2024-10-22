import { useEffect, useState } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';

import { db } from './data/db';

function App() {
  const initialCart = () => {
    const initialValues = localStorage.getItem('cart');
    return initialValues ? JSON.parse(initialValues) : [];
  };
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    setData(db);
  }, []);

  const addToCart = (item) => {
    const exists = cart.findIndex((itemCart) => itemCart.id === item.id);
    if (exists >= 0) {
      const updatedCart = [...cart];
      updatedCart[exists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (item) => {
    const newCart = cart.filter((cartItem) => cartItem.id != item.id);
    setCart(newCart);
  };

  const increaseQuantity = (item) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id == item.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return cartItem;
    });
    setCart(newCart);
  };

  const decreaseQuantity = (item) => {
    const newCart = cart.map((cartItem) => {
      if (cartItem.id == item.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return cartItem;
    });
    setCart(newCart);
  };

  const resetCart = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        resetCart={resetCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
