import React from 'react';
import Login from './login';
import Chat from './chat';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false };
    this.closeLogin = this.closeLogin.bind(this);
    this.view = this.view.bind(this);
  }

  closeLogin() {
    this.setState({ login: true });
  }

  view() {
    if (!this.state.login) {
      return <Login
              closeLogin={this.closeLogin}
              socket={this.props.socket}
              />;
    } else {
      return <Chat socket={this.props.socket} />;
    }
  }

  render() {
    return (
      <div>
        <Login closeLogin={this.closeLogin} socket={this.props.socket} />
        <Chat socket={this.props.socket} />
      </div>
    );
  }
}

export default ChatApp;
