import React from 'react';
var EmojiPicker = require('react-emoji-picker');
import EMOJIS from '../../assets/emojis';
import emojiMap from 'react-emoji-picker/lib/emojiMap';
import $ from 'jquery';

const emojiPickerStyles = {
  position: 'fixed',
  right: '5%', bottom: '10%',
  backgroundColor: 'white',
  height: 'auto',
  width: '40%',
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
    this.updateState = this.updateState.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
    this.emojiPicker = this.emojiPicker.bind(this);
  }

  componentDidMount() {
    $('left-side').on('click', () => this.setState({showEmojiPicker: false}));
    $('#chat').on('click', () => this.setState({showEmojiPicker: false}));
    $('.gif-button').on('click', () => this.setState({showEmojiPicker: false}));
    $('#message').focus(() => this.setState({showEmojiPicker: false}));
  }

  toggleEmojiPicker(e){
    e.preventDefault();
    if(this.state.showEmojiPicker) {
      this.setState({showEmojiPicker: false});
    } else {
      this.setState({showEmojiPicker: true});
    }
  }

  updateState(e) {
    this.setState({emoji: e.target.value});
  }

  setEmoji(emoji) {
    let unicode = EMOJIS[emoji.slice(1, emoji.length - 1)];
    let $input = $('.message-input');
    let message = [$input.val(), unicode].join(' ');
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
