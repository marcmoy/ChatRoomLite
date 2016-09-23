import React from 'react';
import $ from 'jquery';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.messages = this.messages.bind(this);
  }

  componentDidMount() {
    this.props.socket.emit('fetch messages', messages => {
      this.setState({ messages: messages });
      this.scrollToBottom();
    });

    this.props.socket.on('receive messages', messages => {
      this.setState({ messages: messages });
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    $('#chat').animate({ scrollTop: $('#chat').prop("scrollHeight")}, 500);
  }

  messages() {
    let currentUser = this.props.currentUser;
    let messages = this.state.messages.map((message, i) => {

      let bubbleClass = 'speech-bubble';
      let messageClass = 'message animated fadeInLeft';
      let userClass = 'message-avatar-username';
      if (message.user) {
        if (currentUser.username === message.user.username) {
          bubbleClass = 'speech-bubble-owner';
          messageClass = 'message-owner animated fadeInRight';
          userClass = 'message-avatar-username-owner';
        }
      }

      let src, avatar;
      if (message.user) {
        src = `/assets/avatars/${message.user.avatar}.png`;
        avatar =
          <div className={userClass}>
            <img src={src} id='avatar-chat'/><span>
              {message.user.username}
            </span>
          </div>;
      } else {
        messageClass = 'message-notification animated zoomIn';
        bubbleClass = 'message-bubble';
      }

      return(
        <li className={messageClass} key={i}>
          <div className={bubbleClass}>{message.text}</div>
          {avatar}
        </li>
      );
    });

    return messages;
  }

  render() {
    return(
      <div className='chat-window' id='chat'>
        <ul>{this.messages()}</ul>
      </div>
    );
  }
}

export default ChatWindow;
