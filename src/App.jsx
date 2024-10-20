import { useEffect, useState } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';

import { db } from './data/db';

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

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

  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} />
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
