import React from 'react';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="row" id="messageArea">
        <div className="col-md-4">
          <div className="well">
            <h3>Online Users</h3>
            <ul className="list-group" id="users"></ul>
          </div>
        </div>
        <div className="col-md-8">
          <div className="cat" id="chat"></div>

          <form id="messageForm">
            <div className="form-group">
              <label>Enter message</label>
              <textarea className="form-control" id="message"></textarea>
              <br/>
              <input type="submit" className="btn btn-primary" value="Send Message" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
