import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './components/chat_app';

document.addEventListener('DOMContentLoaded', () => {
  const socket = io.connect();
  const root = document.getElementById('root');
  ReactDOM.render(<ChatApp socket={socket}/>, root);
});
