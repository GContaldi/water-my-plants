import io from 'socket.io-client';
const socket = io();

socket.on('connect', function(){
  console.log("client connected");
  socket.emit('client-message', 'test client message');
});

socket.on('event', function(data){});
socket.on('disconnect', function(){});
