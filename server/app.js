require('./config/config');

const express = require("express");
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require("body-parser");
const db = require('./db/config')
const User = require('./models/users')
const Chat = require('./models/chats')
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {socketCommunication} = require('./routes/sockets.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routes'));

io.on('connection',socketCommunication)
const serverCreated = server.listen(3000, function () {
    console.log("Listening on port %s...", serverCreated.address().port);
});