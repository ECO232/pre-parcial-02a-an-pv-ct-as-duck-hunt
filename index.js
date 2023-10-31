import express from 'express';
import http from 'http';
import { SerialPort } from 'serialport';
import { ReadlineParser } from 'serialport';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const staticDisplay = express.static('public');

// Arduino 
const protocolConfiguration = {
    path: 'COM3',
    baudRate: 9600
}
const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

const io = new Server(server);


app.use('/game', staticDisplay);

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

parser.on('data', (data) => {
  console.log(data)
  // Enviar datos de Arduino a todos los clientes conectados
  io.emit('arduinoData', data);
});
io.on('connection', (socket) => {
    console.log('Nueva conexión de Socket.IO');
  
    // Escuchar datos desde Arduino
  
    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

  port.on('open', () => {
    console.log('Puerto serie abierto');
  });