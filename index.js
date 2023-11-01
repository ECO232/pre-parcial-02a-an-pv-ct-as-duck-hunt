import * as http from 'http';
import { SerialPort } from 'serialport'
import { ReadlineParser } from 'serialport'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'))

const protocolConfiguration = {
    path: 'COM5',
    baudRate: 9600
}


const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

app.get('/', (req, res) => {
  console.log("Hello There!")
})
port.on('error', function (err) {
  console.log('Error: ', err.message);
})

parser.on('data', (data) => {
  //console.log(data);
  let input = data.split(":");
  console.log(input[1]);
  if (parseInt(input[1]) == 1) {  // Reemplaza "SHOOT" por la señal que envíe tu Arduino cuando se presione el botón.
    io.emit("shoot");  // Notifica a todos los clientes de la acción de disparo.
  }
});

io.on('connect', (socket) => {
  console.log('Usuario conectado');

  socket.on('disconnect', () => {
    console.log('Usuario conectado');
  })
})

server.listen(3000, () => {
  console.log('LISTENING PORT 3000')
});
