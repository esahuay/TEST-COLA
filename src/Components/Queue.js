import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';  // Importar la instancia del socket

const Queue = () => {
  const [queuePosition, setQueuePosition] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('joinPurchase');

    socket.on('inQueue', ({ position }) => {
      setQueuePosition(position);
    });

    socket.on('accessGranted', () => {
      setHasAccess(true);
      navigate('/purchase');
    });

    socket.on('accessDenied', () => {
      setHasAccess(false);
      navigate('/');
    });

    return () => {
      socket.off('inQueue');
      socket.off('accessGranted');
      socket.off('accessDenied');
    };
  }, [navigate]);

  if (!hasAccess && queuePosition === null) {
    return <div>Verificando acceso...</div>;
  }

  return (
    <div className="queue">
      {queuePosition !== null ? (
        <h1>Estás en la posición {queuePosition} de la cola</h1>
      ) : (
        <h1>Esperando para entrar...</h1>
      )}
    </div>
  );
};

export default Queue;
