import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';  // Importar la instancia del socket

const Purchase = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [messages, setMessages] = useState([]);  // Estado para almacenar los mensajes del chat
  const [newMessage, setNewMessage] = useState('');  // Estado para el mensaje actual
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario tiene acceso
    socket.emit('checkAccess');

    socket.on('accessGranted', () => {
      console.log(`Acceso permitido Purchase`);
      setHasAccess(true);
    });

    socket.on('accessDenied', () => {
      console.log(`Acceso denegado Purchase`);
      setHasAccess(false);
      navigate('/');
    });

    // Recibir mensajes anteriores al conectarse
    socket.on('previousMessages', (chatMessages) => {
      setMessages(chatMessages);
    });

    // Recibir nuevos mensajes en tiempo real
    socket.on('newMessage', (message) => {
      console.log(`Mensaje nuevo recibido: ${message}`);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('accessGranted');
      socket.off('accessDenied');
      socket.off('previousMessages');
      socket.off('newMessage');
    };
  }, [navigate]);

  // Manejar el envío de un nuevo mensaje
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log(`${newMessage}`);
      socket.emit('sendMessage', newMessage);  // Emitir evento para enviar mensaje
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'You', message: newMessage, timestamp: new Date() }
      ]);  // Mostrar el mensaje en el chat como propio
      setNewMessage('');  // Limpiar el input
    }
  };

  if (!hasAccess) {
    return <div>Verificando acceso...</div>;
  }

  return (
    <div className="purchase">
      <h1>Bienvenido a la pantalla de compra</h1>
      {/* Aquí va el contenido de la pantalla de compra */}

      <div className="chat">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.user}:</strong> {msg.message} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
            </div>
          ))}
        </div>

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje"
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Purchase;
