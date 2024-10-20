import React, { useMemo } from 'react';

function Cart({ cart, removeFromCart }) {
  //State derivado
  const isEmpty = useMemo(() => cart.length > 0, [cart]);

  const totalCart = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return (
    <div className="carrito">
      <img
        className="img-fluid"
        src="./public/img/carrito.png"
        alt="imagen carrito"
      />

      <div id="carrito" className="bg-white p-3">
        {isEmpty ? (
          <>
            <table className="w-100 table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <img
                          className="img-fluid"
                          src={`./public/img/${item.image}.jpg`}
                          alt="imagen guitarra"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td className="fw-bold">
                        {item.price.toLocaleString('ES-ar', {
                          style: 'currency',
                          currency: 'ARS',
                        })}
                      </td>
                      <td className="flex align-items-start gap-4">
                        <button type="button" className="btn btn-dark">
                          -
                        </button>
                        {item.quantity}
                        <button type="button" className="btn btn-dark">
                          +
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => removeFromCart(item)}
                          className="btn btn-danger"
                          type="button"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <p className="text-end">
              Total pagar:{' '}
              <span className="fw-bold">
                {totalCart.toLocaleString('ES-ar', {
                  style: 'currency',
                  currency: 'ARS',
                })}
              </span>
            </p>
            <button className="btn btn-dark w-100 mt-3 p-2">
              Vaciar Carrito
            </button>
          </>
        ) : (
          <p className="text-center">El carrito esta vacio</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
