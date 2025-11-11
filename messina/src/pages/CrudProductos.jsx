import React, { useEffect, useState } from "react";
import "../css/CrudProductos.css";

const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
  });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const API_URL = "http://localhost:8000/api/productos";

  // Obtener productos al cargar la página
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  // Agregar producto
  const agregarProducto = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      if (res.ok) {
        setMensaje("✅ Producto agregado correctamente");
        setNuevoProducto({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
        obtenerProductos();
      } else {
        setMensaje("❌ Error al agregar producto");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMensaje("🗑️ Producto eliminado correctamente");
        obtenerProductos();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Editar producto
  const editarProducto = (producto) => {
    setEditando(producto.id);
    setNuevoProducto(producto);
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${editando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      if (res.ok) {
        setMensaje("✏️ Producto actualizado correctamente");
        setEditando(null);
        setNuevoProducto({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
        obtenerProductos();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="productos-page">
      <h1>Gestión de Productos</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <form onSubmit={editando ? guardarEdicion : agregarProducto} className="producto-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={nuevoProducto.descripcion}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={nuevoProducto.stock}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL Imagen"
          value={nuevoProducto.imagen}
          onChange={handleChange}
        />

        <button type="submit" className="btn-guardar">
          {editando ? "Guardar Cambios" : "Agregar Producto"}
        </button>
        {editando && (
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => {
              setEditando(null);
              setNuevoProducto({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="productos-lista">
        {productos.map((p) => (
          <div key={p.id} className="producto-card">
            {p.imagen && <img src={p.imagen} alt={p.nombre} />}
            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>
            <p><strong>Precio:</strong> ${p.precio}</p>
            <p><strong>Stock:</strong> {p.stock}</p>

            <div className="botones">
              <button onClick={() => editarProducto(p)} className="btn-editar">Editar</button>
              <button onClick={() => eliminarProducto(p.id)} className="btn-eliminar">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrudProductos;
