import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Carrito = ({ onClose }) => {
  const { user } = useAuthStore();
  const [carrito, setCarrito] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:3001/api/carrito/${user.id}`)
        .then(res => {
          setCarrito(res.data);
          calcularTotal(res.data);
        })
        .catch(err => console.error("Error al obtener el carrito:", err));
    }
  }, [user]);

  const calcularTotal = (items) => {
    const total = items.reduce((acc, item) => acc + Number(item.total_producto), 0);
    setTotalCarrito(total);
  };

  const eliminarProducto = async (id_carrito_detalle) => {
    try {
      await axios.delete(`http://localhost:3001/api/carrito/${id_carrito_detalle}`);
      const actualizado = carrito.filter(item => item.id_carrito_detalle !== id_carrito_detalle);
      setCarrito(actualizado);
      calcularTotal(actualizado);
    } catch (err) {
      console.error("Error al eliminar producto del carrito:", err);
    }
  };

  const cambiarCantidad = async (id_carrito_detalle, nuevaCantidad) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/carrito/${id_carrito_detalle}`, { cantidad: nuevaCantidad });
      const actualizado = carrito.map(item =>
        item.id_carrito_detalle === id_carrito_detalle
          ? {
              ...item,
              cantidad: nuevaCantidad,
              total_producto: Number((nuevaCantidad * item.precio_unitario).toFixed(2)),
            }
          : item
      );
      setCarrito(actualizado);
      calcularTotal(actualizado);
    } catch (err) {
      console.error("Error al actualizar cantidad:", err);
    }
  };

  const irADetalle = (id_producto) => {
    onClose();
    navigate(`/productoDetalle/${id_producto}`);
  };

  const comprar = async () => {
    try {
      const resVenta = await axios.post('http://localhost:3001/api/ventas', {
        id_usuario: user.id,
        total: totalCarrito
      });

      const id_venta = resVenta.data.id_venta;

      await Promise.all(carrito.map(item =>
        axios.post('http://localhost:3001/api/detalle_ventas', {
          id_venta,
          id_producto: item.id_producto,
          precio_unitario: item.precio_unitario,
          total_detalle: item.total_producto
        })
      ));

      await axios.delete(`http://localhost:3001/api/carrito/usuario/${user.id}`); // endpoint para limpiar el carrito del usuario

      setCarrito([]);
      setTotalCarrito(0);
      alert("Compra realizada con éxito");
      onClose();
    } catch (err) {
      console.error("Error al procesar la compra:", err);
      alert("Error al procesar la compra");
    }
  };

  return (
    <aside className="absolute right-0 top-16 w-96 bg-white shadow-lg p-4 rounded z-50">
      <h2 className="text-xl font-bold mb-4">🛒 Tu carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {carrito.map((item) => (
              <li key={item.id_carrito_detalle || item.id_producto} className="border-b pb-2">
                <div
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => irADetalle(item.id_producto)}
                >
                  <p className="font-semibold">{item.nombre}</p>
                </div>
                <p>Precio unitario: ${Number(item.precio_unitario).toFixed(2)}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cambiarCantidad(item.id_carrito_detalle, Math.max(1, item.cantidad - 1))}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    onClick={() => cambiarCantidad(item.id_carrito_detalle, item.cantidad + 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => eliminarProducto(item.id_carrito_detalle)}
                    className="ml-auto text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Total: ${Number(item.total_producto).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <p className="text-lg font-semibold text-right">
              Total carrito: ${totalCarrito.toFixed(2)}
            </p>
            <button
              onClick={comprar}
              className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Comprar
            </button>
          </div>
        </>
      )}
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Cerrar
      </button>
    </aside>
  );
};

export default Carrito;
