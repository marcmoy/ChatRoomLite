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
var initialMessage = { user: null, text: 'Chatroom started!' };
var messages = [initialMessage];
var BOT = { username: 'Bot', avatar: 'bot' };

io.sockets.on('connection', function(socket){
  // connect sockets
  connections.push(socket);
  console.log('Connected %s sockets connected', connections.length);

  // disconnect sockets
  socket.on('disconnect', function(data){
      console.log(socket.user, 'has left');
      if (socket.user) {
        var leftMessage = socket.user.username + ' has left the chat';
        messages.push({ user: null, text: leftMessage});
        io.sockets.emit('receive messages', messages);
      }
      users.splice(users.indexOf(socket.user), 1);
      updateUsernames();
      connections.splice(connections.indexOf(socket), 1);
      console.log('Disconnected: %s sockets connected', connections.length);
      if (!connections.length) messages = [initialMessage];
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
    var joinMessage = socket.user.username + ' has joined the chat';
    messages.push({ user: null, text: joinMessage});
    if (users.length === 1) {
      sendIntroMessage();
    }
    io.sockets.emit('receive messages', messages);
    updateUsernames();
  });

  // update usernames
  function updateUsernames(){
    io.sockets.emit('receive users', users);
  }

  // fetch users
  socket.on('fetch users', function(callback){
    callback(users);
  });

  // intro message
  function sendIntroMessage(){
    var message1 = 'Hello! Welcome to ChatRoomLite! 👋';
    var message2 = 'It looks like your chatroom is empty...😦';
    var message3 = 'Invite a friend to message with!';
    messages.push({ user: BOT, text: message1 });
    messages.push({ user: BOT, text: message2 });
    messages.push({ user: BOT, text: message3 });
  }

  // random bot message
  socket.on('random message', function() {
    let botResponse = randomMessage();
    messages.push({ user: BOT, text: botResponse });
    io.sockets.emit('receive messages', messages);
  });

  function randomMessage() {
    var response = manualMessages[idx];
    idx++;
    // cycle through messages by changing idx
    if (idx === manualMessages.length) idx = 0;
    return response;
  }

});

var idx = 0;
var manualMessages = [
  "Hello",
  "Smarter responses are currently being developed...",
  "Try sending a GIF!",
  "http://media3.giphy.com/media/1iTItUOuJLsbev28/200w.gif",
  "Open another tab to test out real time messages with Socket.IO!"
  // randomFact()
];

function randomFact() {
  // grab random fact from some API
}
