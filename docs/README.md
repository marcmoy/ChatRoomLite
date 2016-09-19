#ChatRoomLite

##Background
**ChatRoomLite** is a simple messaging web application. The server is built on *Node.js* and *Express* frameworks while the client side UI utilizes *Socket.IO* for real-time communication.

###CHECK OUT A DEMO LIVE AT: [https://chatroomlite.herokuapp.com](https://chatroomlite.herokuapp.com)

##Server-side
Node.js and Express allows for asynchronous event loops that will create a live chat room experience for multiple connected users. Through [Socket.IO](http://socket.io/), event listeners are designed to send/receive data between the server and all active sockets. Usernames and messages will *not* be stored in a database system, instead, the server will relay data directly to the client-side, making messaging feel instantaneous.

##Client-side
The main focus of this application is demonstrate frontend skills. In addition to messaging, users can send emojis and emojis through an interface resembling an iMessage group chat, coupled with smooth CSS animations.

##Functionality and MVP
- [ ] Users can register a username.
- [ ] Users can send/receive messages in the chatroom.
- [ ] Users can view messages from users on active sockets.
- [ ] Users can send emojis and stickers.
- [ ] Users can send pictures in the chatroom.

##Implementation Timeline

###Day 1
- [x] Setup basic file structure and webpack config.
- [x] Setup and push to Heroku.
- [ ] Create user sign up window and complete styling.
- [ ] Create current user list and complete styling.
- [ ] Style chat window and message input.

###Day 2
- [ ] Complete messaging feature.
- [ ] Style entire page.
- [ ] Create feature to allow users to send emojis.

###Day 3
- [ ] Create feature to allow users to send stickers.
- [ ] Create feature to allow users to send pictures.

###Day 4
- [ ] Fine tune any bugs or features.
- [ ] Complete styling.

###Sample Wireframes

![login](./login.png)

![sample-chat-1](./sample-chat-1.png)

![sample-chat-2](./sample-chat-2.png)

![sample-chat-3](./sample-chat-3.png)
