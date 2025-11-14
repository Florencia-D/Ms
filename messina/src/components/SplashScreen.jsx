import React, { useState, useEffect } from "react";
import '../css/Splash.css'; 

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
  const timer = setTimeout(() => {
    onFinish();
  }, 1500); 
  return () => clearTimeout(timer);
}, [onFinish]);

  return (
    <div className="splash-screen">
      <img src="/Ms3.png" alt="Logo de la empresa" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
