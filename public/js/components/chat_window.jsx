import React from 'react';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.props.socket.emit('fetch messages', messages => {
      this.setState({ messages: messages });
    });

    this.props.socket.on('receive messages', messages => {
      this.setState({ messages: messages });
    });
  }

  render() {
    let messages = this.state.messages.map((message, i) => {
      let src, avatar;
      if (message.user) {
        src = `/assets/avatars/${message.user.avatar}.png`;
        avatar =
          <span>
            <img src={src} id='avatar'/>{message.user.username}
          </span>;
      }
      return(
        <li className='message' key={i}>
          {avatar}
          {message.text}
        </li>
      );
    });

    return(
      <div className='chat' id='chat'>
        <ul>{messages}</ul>
      </div>
    );
  }
}

export default ChatWindow;
