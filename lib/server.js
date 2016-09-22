var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('public'));

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.get('/', function(req, res){
  res.sendFile(__dirname + '../public/index.html');
});

var users = [];
var connections = [];
var introMessage = { user: null, text: 'Chatroom started!' };
var messages = [introMessage];

io.sockets.on('connection', function(socket){
  // connect sockets
  connections.push(socket);
  console.log('Connected %s sockets connected', connections.length);

  // disconnect sockets
  socket.on('disconnect', function(data){
      users.splice(users.indexOf(socket.user), 1);
      updateUsernames();
      connections.splice(connections.indexOf(socket), 1);
      console.log('Disconnected: %s sockets connected', connections.length);
      if (!connections.length) messages = [introMessage];
  });

  // fetch messages
  socket.on('fetch messages', function(callback){
    console.log('fetching messages');
    callback(messages);
  });

  // send messages
  socket.on('send message', function(data){
    var message = { user: socket.user, text: data };
    messages.push(message);
    io.sockets.emit('receive messages', messages);
  });

  // new user
  socket.on('new user', function(user, callback){
    callback(true);
    socket.user = user;
    users.push(socket.user);
    console.log(users);
    updateUsernames();
  });

  // update usernames
  function updateUsernames(){
    io.sockets.emit('receive users', users);
  }

});
