#ChatRoomLite

##Background
**ChatRoomLite** is a simple messaging web application. The server is built on **Node.js** and **Express** frameworks while the client side UI utilizes **Socket.IO** for real-time communication. **React.js** and **jQuery** was used to manage the frontend state.

####CHECK IT OUT AT: [http://www.chatroomlite.xyz](http://www.chatroomlite.xyz)

##Server-side
Node.js and Express allows for asynchronous event loops that will create a live chat room experience for multiple connected users. Through [Socket.IO](http://socket.io/), event listeners are designed to send/receive data between the server and all active sockets. Usernames and messages will **not** be stored in a database system, instead, the server will relay data directly to the client-side, making messaging feel instantaneous.

##Client-side
When the client receives data from socket events, React.js parses that data and updates it's state, which is allows for elements to render dynamically. In addition to providing animations, jQuery was also used to create AJAX requests to request gifs from the [GIPHY API library](https://github.com/Giphy/GiphyAPI).
