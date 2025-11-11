import React, { useState, useEffect } from "react";
import '../css/Splash.css'; // archivo de estilos

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
  const timer = setTimeout(() => {
    onFinish();
  }, 1500); // 1.5s + 0.8s de fadeOut ≈ 2.3s
  return () => clearTimeout(timer);
}, [onFinish]);

  return (
    <div className="splash-screen">
      <img src="/Ms3.png" alt="Logo de la empresa" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
