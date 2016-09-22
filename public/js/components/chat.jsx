import React from 'react';
import ChatWindow from './chat_window';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], messages: [], message: '' };
    this.onlineUsers = this.onlineUsers.bind(this);
    this.bindSocketListeners = this.bindSocketListeners.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
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
      <div className="well" id="online-users">
        <h3>Online Users</h3>
        <ul className="list-group" id="users">
          {users}
        </ul>
      </div>
    );
  }

  updateMessage(e) {
    this.setState({ message: e.target.value });
  }

  sendMessage(e) {
    e.preventDefault();
    if (this.state.message.replace(/\s/g, '').length) {
      this.props.socket.emit('send message', this.state.message);
      this.setState({ message: '' });
    }
  }

  render() {
    return(
      <div className="row" id="messageArea">
        <div className="col-md-4">
          {this.onlineUsers()}
        </div>
        <div className="col-md-8">
          <ChatWindow socket={this.props.socket} />

          <form id="messageForm" onSubmit={this.sendMessage}>
            <div className="form-group">
              <label>Enter message</label>
              <textarea className="form-control"
                id="message" onChange={this.updateMessage}
                value={this.state.message}></textarea>
              <br/>
              <input
                type="submit"
                className="btn btn-primary"
                value="Send Message" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
