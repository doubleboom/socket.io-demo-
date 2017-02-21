$(function() {
  var inputMessage=$('.inputMessage');
  var socket = io();
  inputMessage.keyup(function(){
    console.log(event.keyCode==13);
    if(event.keyCode==13&&inputMessage.val()!=null){
        socket.emit('system message',inputMessage.val());
    }
  })
  function log (message) {
    $('.messages').append('<li>'+message+'</li>')
  }

  // Whenever the server emits 'new message', update the chat body
  socket.on('system message', function (data) {
      log(data.message);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    log(data.message);
  });

  socket.on('disconnect', function () {
    log('you have been disconnected');
  });

  socket.on('reconnect', function () {
    log('you have been reconnected');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', function () {
    log('attempt to reconnect has failed');
  });

});