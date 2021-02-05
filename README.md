# ChatRoomLite

## Background
ChatRoomLite is a lightweight chatroom application. The server is built on **Node.js** and **Express** frameworks along with **Socket.IO** for real-time communication. **React.js** and **jQuery** were used to manage frontend state.

#### CHECK IT OUT AT: ~[http://www.chatroomlite.xyz](http://www.chatroomlite.xyz)~ deprecated

## Server-side
Node.js and Express allows for asynchronous event loops that will create a live chat room experience for multiple connected users. Through [Socket.IO](http://socket.io/), event listeners are designed to send/receive data between the server and all active sockets. Usernames and messages will **not** be stored in a database system, instead, the server will relay data directly to the client-side, making messaging feel instantaneous.

## Client-side
When the client receives data from socket events, React parses the data and will update the component state. This allows for elements to render dynamically as data is emitted from other connected users. In addition to providing animations, jQuery was also used for AJAX requests to retrieve gifs from the [GIPHY API library](https://github.com/Giphy/GiphyAPI).

## Desktop

<img src='/docs/desktop.gif' width='100%'>

## Mobile

<div style='text-align: center'>
<img src='/docs/small-mobile.gif' height='400'>
</div>
