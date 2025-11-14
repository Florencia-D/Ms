// // // src/App.jsx
// // import { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // import Home from "./pages/Home";
// // import Productos from "./pages/Productos";
// // import Serviciotec from "./pages/Serviciotec";
// // import Asesoramiento from "./pages/Asesoramiento";
// // import Contacto from "./pages/Contacto";
// // import QuienesSomos from "./pages/QuienesSomos";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";

// // import SplashScreen from "./components/SplashScreen";
// // import BotonWp from "./components/BotonWp";

// // // 👇 Solo UNA importación de ProductDetail
// // import ProductDetail from "./pages/ProductDetail";

// // function App() {
// //   const [showSplash, setShowSplash] = useState(true);

// //   return (
// //     <>
// //       {showSplash ? (
// //         <SplashScreen onFinish={() => setShowSplash(false)} />
// //       ) : (
// //         <Router>
// //           <Routes>
// //             <Route path="/" element={<Home />} />
// //             <Route path="/productos" element={<Productos />} />
// //             <Route path="/servicioTec" element={<Serviciotec />} />
// //             <Route path="/asesoramiento" element={<Asesoramiento />} />
// //             <Route path="/contacto" element={<Contacto />} />
// //             <Route path="/quienesSomos" element={<QuienesSomos />} />
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/registro" element={<Register />} />
// //             <Route path="/producto/:id" element={<ProductDetail />} />
// //             <Route path="/cart" element={<Cart />} />

// //             {/* Detalle de producto */}
// //             <Route path="/producto/:id" element={<ProductDetail />} />
// //           </Routes>

// //           <BotonWp />
// //         </Router>
// //       )}
// //     </>
// //   );
// // }

// // export default App;



// // src/App.jsx
// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Productos from "./pages/Productos";
// import Serviciotec from "./pages/Serviciotec";
// import Asesoramiento from "./pages/Asesoramiento";
// import Contacto from "./pages/Contacto";
// import QuienesSomos from "./pages/QuienesSomos";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// import SplashScreen from "./components/SplashScreen";
// import BotonWp from "./components/BotonWp";
// import BotonCart from "./components/BotonCart";

// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";            // ✅ FALTABA ESTO

// function App() {
//   const [showSplash, setShowSplash] = useState(true);

//   return (
//     <>
//       {showSplash ? (
//         <SplashScreen onFinish={() => setShowSplash(false)} />
//       ) : (
//         <Router>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/productos" element={<Productos />} />
//             <Route path="/servicioTec" element={<Serviciotec />} />
//             <Route path="/asesoramiento" element={<Asesoramiento />} />
//             <Route path="/contacto" element={<Contacto />} />
//             <Route path="/quienesSomos" element={<QuienesSomos />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/registro" element={<Register />} />
//             <Route path="/producto/:id" element={<ProductDetail />} />
//             <Route path="/cart" element={<Cart />} />

//             {/* 🔁 Esta ruta estaba duplicada, la sacamos */}
//             {/* <Route path="/producto/:id" element={<ProductDetail />} /> */}
//           </Routes>

//           <BotonWp />
//         </Router>
//       )}
//     </>
//   );
// }

// export default App;



// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Serviciotec from "./pages/Serviciotec";
import Asesoramiento from "./pages/Asesoramiento";
import Contacto from "./pages/Contacto";
import QuienesSomos from "./pages/QuienesSomos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";               // 👈 importante
import ProductDetail from "./pages/ProductDetail";

import SplashScreen from "./components/SplashScreen";
import BotonWp from "./components/BotonWp";
import BotonCart from "./components/BotonCart"; // 👈 nuevo

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/servicioTec" element={<Serviciotec />} />
            <Route path="/asesoramiento" element={<Asesoramiento />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/quienesSomos" element={<QuienesSomos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

          {/* Botones flotantes */}
          <BotonWp />
          <BotonCart /> 
        </Router>
      )}
    </>
  );
}

export default App;
