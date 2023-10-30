const express = require('express');
const http = require("http")
const socketIO = require('socket.io');
const cors = require('cors');



const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors()); 

app.use(express.static(__dirname + "/public"))

io.on('connection', (socket) => {
    console.log("Client connected")

    socket.on("disconnect", (socket) => {
        console.log("Client disconnected")
    })
});

server.listen(3000, () => {
    console.log("Server listening at port 3000");
});
