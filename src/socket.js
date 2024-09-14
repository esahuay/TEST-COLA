import { io } from 'socket.io-client';

// Crear una instancia del socket
const socket = io('http://localhost:3001', {
  withCredentials: true,  // Enviar credenciales con la solicitud
});

socket.on('connect', () => {
  console.log('Conectado al servidor con el ID:', socket.id);
});

socket.on('connect_error', (error) => {
  console.error('Error de conexión:', error);
});

export default socket;
