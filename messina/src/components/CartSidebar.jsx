
import "../css/CartSidebar.css";

const CartSidebar = ({ cartItems, onClose }) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      {/* Fondo semitransparente */}
      <div className="cart-backdrop" onClick={onClose}></div>

      {/* Sidebar */}
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>
                  {item.qty} x ${item.price}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <h3>Total: ${totalPrice}</h3>
          <button className="btn-checkout">Finalizar compra</button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
