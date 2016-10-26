import React from 'react';
import ChatWindow from './chat_window';
import EmojiInput from './emoji_input';
import GIFInput from './gif_input';
import $ from 'jquery';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], messages: [], message: '' };
    this.onlineUsers = this.onlineUsers.bind(this);
    this.bindSocketListeners = this.bindSocketListeners.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendGIF = this.sendGIF.bind(this);
    this.width = $(window).width();
  }

  componentDidMount() {
    this.bindSocketListeners();
  }

  bindSocketListeners() {
    this.props.socket.on('receive users', users => {
      this.setState({ users: users });
    });
    this.props.socket.on('receive messages', messages => {
      this.setState({ messages: messages });
    });
  }

  onlineUsers() {
    let users = this.state.users.map((user,i) => {
      let src = `/assets/avatars/${user.avatar}.png`;
      return(
        <li key={i}>
          <img src={src} id='avatar'/>
          {user.username}
        </li>
      );
    });

    return(
      <div id="online-users">
        <h4>Online Users</h4>
        <ul className="list-group" id="users">
          {users}
        </ul>
      </div>
    );
  }

  updateMessage(e) {
    if (typeof e === 'string') {
      this.setState({ message: e });
      this.updateSendButton(e);
    } else {
      this.setState({ message: e.target.value });
      this.updateSendButton( e.target.value );
    }
  }

  updateSendButton(message) {
    if (this.width > 420) return;
    if (message === '') {
      $('.send-button').animate(
        { width: '0', padding: '0', color: 'transparent'} , 300);
    } else {
      $('.send-button').animate(
        { width: '60px', padding: '6px 12px', color: 'white'}
      , 300);
    }
  }

  sendMessage(e) {
    e.preventDefault();
    if (this.state.message.replace(/\s/g, '').length) {
      this.props.socket.emit('send message', this.state.message);
      this.setState({ message: '' });
      $('.send-button').animate(
        {
          width: '0',
          padding: '0',
          color: 'transparent'
        } , 300);
      if (this.state.users.length === 1) {
        this.props.socket.emit('random message');
      }
    }
  }

  sendGIF(e) {
    e.preventDefault();
    this.props.socket.emit('send message', e.target.src);
  }

  render() {
    return(
      <div id="messageArea">
        <div className="left-side">
          {this.onlineUsers()}
        </div>
        <div className="chat-container">
          <ChatWindow socket={this.props.socket}
            currentUser={this.props.currentUser}/>

          <form id="message-form" className='form-inline chat'
            onSubmit={this.sendMessage}>
            <div className="form-group">
              <input className="form-control message-input"
                placeholder='Enter message'
                id="message" onChange={this.updateMessage}
                value={this.state.message}></input>
              <EmojiInput updateMessage={this.updateMessage}/>
              <GIFInput sendGIF={this.sendGIF} closeGIF={this.closeGIF}/>
              <button className='btn btn-primary send-button'
                onClick={this.sendMessage}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
