import React from 'react';
import Avatars from './avatars';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', avatar: '', users: [] };
    this.setUsername = this.setUsername.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.socket.emit('fetch users', users => {
      this.setState({ users: users });
    });

    this.props.socket.on('receive users', users => {
      this.setState({ users: users });
    });
  }

  setUsername(e){
    this.setState({ username: e.target.value });
    this.validUsername(e.target.value);
  }

  setAvatar(avatar){
    this.props.updateCurrentUser(this.state);
    this.setState({ avatar: avatar });
  }

  validUsername(username) {
    let valid = true;

    let currentUsernames = this.state.users.map(user => {
      return user.username;
    });

    if (username.length === 0){
      valid = false;
      $('#username-error').html(
        "<span>Username can't be blank.</span>"
      );
    } else if (username.includes(' ')){
      valid = false;
      $('#username-error').html(
        "<span>Username can't include spaces.</span>"
      );
    } else if (currentUsernames.includes(username)) {
      valid = false;
      $('#username-error').html(
        "<span>Username already taken.</span>"
      );
    } else {
      $('#username-error').html(
        "<span><br></span>"
      );
    }

    return valid;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validUsername(this.state.username)) {
      this.props.updateCurrentUser(this.state);
      this.props.socket.emit('new user', this.state, data => {
        if (data) {
          $('#userForm').removeClass('bounceInDown');
          $('#userForm').addClass('bounceOutUp');
          window.setTimeout(() => {
            $('#userFormArea').css('display', 'none').css('height', '0');
            this.props.closeLogin();
          }, 1000);
        }
      });
    } else {
      $('#enter-username').addClass('animated shake');
      window.setTimeout(() => (
        $('#enter-username').removeClass('animated shake')
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
            <input
              className='form-control text-center username-input'
              placeholder='Enter a username'
              onChange={this.setUsername}
              id='username' />
            <div id='username-error'><br/></div>
          </div>
          <div id='select-avatar' className='form-group'>
            <Avatars setAvatar={this.setAvatar} />
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
