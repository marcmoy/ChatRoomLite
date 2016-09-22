import React from 'react';
import Login from './login';
import Chat from './chat';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false, currentUser: null };
    this.closeLogin = this.closeLogin.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.view = this.view.bind(this);
  }

  closeLogin() {
    this.setState({ login: true });
  }

  updateCurrentUser(user) {
    this.setState({ currentUser: user });
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
        <Login closeLogin={this.closeLogin} socket={this.props.socket}
            updateCurrentUser={this.updateCurrentUser} />
        <Chat socket={this.props.socket} user={this.props.user}
          currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default ChatApp;
