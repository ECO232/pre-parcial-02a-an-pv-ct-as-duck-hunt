import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'

const express = require('express');
const http = require('http');

const app = express(); //instancia 
const PORT = 3000;
const server = http.createServer(app);

//Arduino 
const protocolConfiguration = {
    path: 'COM3',
    baudRate: 9600
}
const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

const socketIo = require('socket.io');
const io = socketIo(server) //instancia

const staticDisplay = express.static('public');

//p5js game 
app.use('/game', staticDisplay);

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });


  io.on('connection', (socket) => {
    console.log('Nueva conexión de Socket.IO');

    // Escuchar datos desde Arduino
    parser.on('data', (data) => {
        // Enviar datos de Arduino a todos los clientes conectados
        io.emit('arduinoData', data);
    });

    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});