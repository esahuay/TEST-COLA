// src/Components/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleEnterQueue = () => {
    navigate('/queue');
  };

  return (
    <div className="welcome">
      <h1>Bienvenido a la Tienda</h1>
      <button onClick={handleEnterQueue}>Entrar a la Cola</button>
    </div>
  );
};

export default Welcome;
