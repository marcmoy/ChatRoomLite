import React from 'react';
var EmojiPicker = require('react-emoji-picker');
import emojiMap from 'react-emoji-picker/lib/emojiMap';
import $ from 'jquery';

const emojiPickerStyles = {
  position: 'fixed',
  right: '5%', bottom: '10%',
  backgroundColor: 'white',
  width: '50%',
  height: 'auto',
  padding: '.3em .6em',
  border: '1px solid #ccc',
  borderRadius: '5px',
  zIndex: '2'
};

class EmojiInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { emoji: null, showEmojiPicker: false };
    this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
    this.validateEmoji = this.validateEmoji.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
    this.emojiPicker = this.emojiPicker.bind(this);
  }

  componentDidMount() {
    $('.chat-window').on('click', () => this.setState({showEmojiPicker: false}));
    $('.left-side').on('click', () => this.setState({showEmojiPicker: false}));
  }

  toggleEmojiPicker(e){
    e.preventDefault();
    if(this.state.showEmojiPicker) {
      setTimeout(this.validateEmoji, 10);
      this.setState({showEmojiPicker: false});
    } else {
      this.setState({showEmojiPicker: true});
    }
  }

  validateEmoji() {
    let matched = emojiMap.filter(emoji => {
      return `:${emoji.name}:` === this.state.emoji;
    });

    if(matched.length === 0) {
      this.setState({emoji: null});
    }
  }

  updateState(e) {
    this.setState({emoji: e.target.value});
  }

  setEmoji(emoji) {
    let $input = $('.message-input');
    let message = [$input.val(), emoji].join(' ');
    this.props.updateMessage(message);
    this.setState({showEmojiPicker: false});
    $input.focus();
  }

  emojiPicker() {
    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker
          style={emojiPickerStyles} onSelect={this.setEmoji}
        />
    );
    }
  }

  render() {
    return (
      <div ref="emoji" className="emoji-container">
        <span className='emoji-button' onClick={this.toggleEmojiPicker}>
          ☺
        </span>
        {this.emojiPicker()}
      </div>
    );
  }
}

export default EmojiInput;
