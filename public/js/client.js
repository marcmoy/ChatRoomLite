document.addEventListener('DOMContentLoaded', function() {

  var socket = io.connect();
  var $messageArea = $('#messageArea');
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');
  var $userFormArea = $('#userFormArea');
  var $userForm = $('#userForm');
  var $username = $('#username');
  var $users = $('#users');

  $messageForm.submit(function(e){
    e.preventDefault();
    socket.emit('send message', $message.val());
    $message.val('');
  });

  // receive message
  socket.on('receive message', function(data){
    var username = '<strong>' + data.user + ': </strong>';
    var message = '<div class="well">' + username + data.msg + '</div>';
    $chat.append(message);
  });

  // new user
  $userForm.submit(function(e){
    e.preventDefault();
    socket.emit('new user', $username.val(), function(data){
      if (data) {
        $userFormArea.hide();
        $messageArea.show();
      }
    });
  });

  // get users
  socket.on('get users', function(data){
    var usernames = '';
    for (var i = 0; i < data.length; i++) {
      var user = '<li class="list-group-item">' + data[i] + '</li>';
      usernames += user;
    }
    $users.html(usernames);
  });

});
