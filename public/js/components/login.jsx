import React from 'react';
import Avatars from './avatars';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', avatar: '' };
    this.setUsername = this.setUsername.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setUsername(e){
    this.setState({ username: e.target.value });
  }

  setAvatar(e){
    this.setState({ avatar: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let valid = true;

    if (this.state.username.includes(' ') || this.state.username.length === 0) {
      valid = false;
      $('#username-error').show();
      $('#enter-username').addClass('animated shake');
      window.setTimeout(() => (
        $('#enter-username').removeClass('animated shake')
      ), 1000);
    } else {
      $('#username-error').hide();
    }

    if (this.state.avatar === ''){
      valid = false;
      $('#avatar-error').show();
      $('#select-avatar').addClass('animated shake');
      window.setTimeout(() => (
        $('#select-avatar').removeClass('animated shake')
      ), 1000);
    } else {
      $('#avatar-error').hide();
    }

    if (valid) this.props.closeLogin();
  }

  render() {
    return(
      <div id='userFormArea' onSubmit={this.handleSubmit}>
        <form id='userForm' className='text-center animated bounceInDown'>
          <h1>Welcome to ChatRoomLite!</h1>
          <div id='enter-username' className='form-group'>
            <h3>Enter a Username</h3>
            <input
              className='form-control text-center'
              onChange={this.setUsername}
              id='username' />
            <div id='username-error' className='error'>
              Username can't be blank or container spaces.
            </div>
          </div>
          <div id='select-avatar' className='form-group'>
            <br/>
            <Avatars setAvatar={this.setAvatar} />
            <br/>
            <br/>
            <div id='avatar-error' className='error'>
              Need to select an avatar.
            </div>
            <input type='submit' className='btn btn-primary' value='Login' />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
