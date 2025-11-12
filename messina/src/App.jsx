// import React, { useState } from "react";
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { home, asesoramiento, servicioTecnico,productCard,login,register, productos, contacto, quienesSomos } from "./routes/path";
// import Home from './pages/Home';
// import Productos from './pages/Productos';
// import ServcioTec from './pages/Serviciotec';
// import Asesoramiento from './pages/Asesoramiento';
// import Contacto from './pages/Contacto';
// import QuienesSomos from './pages/QuienesSomos';
// import BotonWp from "./components/BotonWp";
// import Login from "./pages/Login";
// import SplashScreen from './components/SplashScreen';
// import Register from "./pages/Register";



// function App() {
  
//   const [showSplash, setShowSplash] = useState(true);


//   return (
//     <>
//       {showSplash ? (
//         <SplashScreen onFinish={() => setShowSplash(false)} />
//       ) : (
//         <Router>
//             <Routes>
//               <Route path={home} element={<Home />} />
//               <Route path={productos} element={<Productos />} />
//               <Route path={servicioTecnico} element={<ServcioTec />} />
//               <Route path={asesoramiento} element={<Asesoramiento />} />
//               <Route path={contacto} element={<Contacto />} />
//               <Route path={quienesSomos} element={<QuienesSomos />} />
//               <Route path={login} element={<Login />} />
//               <Route path={register} element={<Register/>}/>
        
//             </Routes>
//           <BotonWp />
//         </Router>
//       )}
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { home, asesoramiento, servicioTecnico, productCard, login, register, productos, contacto, quienesSomos } from "./routes/path";
import Home from './pages/Home';
import Productos from './pages/Productos';
import ServcioTec from './pages/Serviciotec';
import Asesoramiento from './pages/Asesoramiento';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';
import BotonWp from "./components/BotonWp";
import Login from "./pages/Login";
import SplashScreen from './components/SplashScreen';
import Register from "./pages/Register";

// 👇 Importamos el contexto
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          <Routes>
            <Route path={home} element={<Home />} />
            <Route path={productos} element={<Productos />} />
            <Route path={servicioTecnico} element={<ServcioTec />} />
            <Route path={asesoramiento} element={<Asesoramiento />} />
            <Route path={contacto} element={<Contacto />} />
            <Route path={quienesSomos} element={<QuienesSomos />} />
            <Route path={login} element={<Login />} />
            <Route path={register} element={<Register />} />
          </Routes>
          <BotonWp />
        </Router>
      )}
    </AuthProvider>
  );
}

export default App;
