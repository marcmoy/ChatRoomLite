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
    if (e.target.value.includes(' ')) {
      $('#username-error').html("<span>Username can't have spaces.</span>");
    } else {
      $('#username-error').html('<br>');
    }
  }

  setAvatar(e){
    this.setState({ avatar: e.target.value });
    $('#avatar-error').html('<br>');
  }

  handleSubmit(e) {
    e.preventDefault();
    let valid = true;

    if (this.state.username.includes(' ') || this.state.username.length === 0) {
      valid = false;
      $('#username-error').html(
        "<span>Username can't be blank or have spaces.</span>"
      );
      $('#enter-username').addClass('animated shake');
      window.setTimeout(() => (
        $('#enter-username').removeClass('animated shake')
      ), 1000);
    } else {
      $('#username-error').html('<br>');
    }

    if (this.state.avatar === ''){
      valid = false;
      $('#avatar-error').html('<span>Must select an avatar.</span>');
      $('#select-avatar').addClass('animated shake');
      window.setTimeout(() => (
        $('#select-avatar').removeClass('animated shake')
      ), 1000);
    } else {
      $('#avatar-error').html('<br>');
    }

    if (valid) {
      $('#userForm').removeClass('bounceInDown');
      $('#userForm').addClass('bounceOutUp');
      window.setTimeout(() => (
        this.props.closeLogin()
      ), 1000);
    }
  }

  render() {
    return(
      <div id='userFormArea' onSubmit={this.handleSubmit}>
        <form id='userForm'
            className='text-center animated bounceInDown shadow'>
          <h1>Welcome to ChatRoomLite!</h1>
          <div id='enter-username' className='form-group'>
            <h3>Enter a Username</h3>
            <input
              className='form-control text-center'
              onChange={this.setUsername}
              id='username' />
            <div id='username-error' className='error'><br/></div>
          </div>
          <div id='select-avatar' className='form-group'>
            <Avatars setAvatar={this.setAvatar} />
            <div id='avatar-error' className='error'><br/></div>
          </div>
          <div className='form-group'>
            <input type='submit' className='btn btn-primary' value='Login' />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
