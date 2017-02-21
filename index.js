var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


io.on('connection', function (socket) {
  // when the client emits 'new message', this listens and executes
  socket.on('system message', function (data) {
      console.log(data);
    // we tell the client to execute 'new message'
    socket.broadcast.emit('system message', {
      message: "hello everybody"
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
      // echo globally that this client has left
      console.log('has gone');
      socket.broadcast.emit('user left', {
        numUsers: "bye"
      });
  });
});

app.use(express.static('public'));

server.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

  console.log('Example app listening at localhost');
});

