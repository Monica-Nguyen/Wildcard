//used this for reference: https://sabe.io/tutorials/how-to-build-real-time-chat-app-node-express-socket-io
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(__dirname + "/ChatBox.html");
});

module.exports = function(io){
    io.on('connection', (socket) => {
        socket.on("user_join", function(data) {
            this.username = data;
            socket.broadcast.emit("user_join", data);
        });
    
        socket.on("chat_message", function(data) {
            data.username = this.username;
            socket.broadcast.emit("chat_message", data);
        });
    
        socket.on("disconnect", function(data) {
            socket.broadcast.emit("user_leave", this.username);
        });
    })

};

module.exports = router;