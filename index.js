const express = require('express');
const http = require('http');

const app = express(); //instancia 
const PORT = 3000;
const server = http.createServer(app);
/* const httpServer = app.listen(PORT); */

const socketIo = require('socket.io');
const io = socketIo(server) //instancia

const staticDisplay = express.static('public');

app.use('/game', staticDisplay);

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });


  io.on('connection', (socket) => {
    console.log('Nueva conexión de Socket.IO');
  }
  )