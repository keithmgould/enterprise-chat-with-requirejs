var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    static = require('node-static')

app.listen(3000);

// Handle static files
var file = new(static.Server)('./public');
function handler (req, res) {
  req.addListener('end',function(){
    file.serve(req, res);
  });
}

// Handle socket connections
io.sockets.on('connection', function (socket) {

  // Handle new messages from a client
  socket.on('new-message', function (data) {
    console.log(data + ". BROADCASTING");
    socket.broadcast.emit("new-message",data);
  });
});
