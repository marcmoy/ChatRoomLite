import React from 'react';
import $ from 'jquery';
import { fetchGIFS } from '../../util/gif_api';

const gifStyle = {
  position: 'fixed',
  right: '2.5%', bottom: '10%',
  backgroundColor: 'white',
  padding: '.3em .6em',
  border: '1px solid #ccc',
  borderRadius: '5px',
  zIndex: '2'
};

class GIFInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gifs: [], showGIFPicker: false };
    this.toggleGIF = this.toggleGIF.bind(this);
    this.updateGifs = this.updateGifs.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
    this.sendGIF = this.sendGIF.bind(this);
    this.gifPicker = this.gifPicker.bind(this);
    this.gifResults = this.gifResults.bind(this);
  }

  componentDidMount() {
    $('left-side').on('click', () => this.setState({showGIFPicker: false}));
    $('#chat').on('click', () => this.setState({showGIFPicker: false}));
    $('.emoji-button').on('click', () => this.setState({showGIFPicker: false}));
    $('#message').focus(() => this.setState({showGIFPicker: false}));
    let success = result => this.updateGifs(result);
    let error = data => console.log(data);
    fetchGIFS('dog', success, error);
  }

  toggleGIF(e) {
    e.preventDefault();
    if (this.state.showGIFPicker) {
      this.setState({ showGIFPicker: false });
    } else {
      this.setState({ showGIFPicker: true });
    }
  }

  updateGifs(result) {
    this.setState({ gifs: result.data });
  }

  sendQuery(e) {
    e.preventDefault();
    let query;
    if (e.target.value) {
      query = e.target.value;
    } else {
      query = $('#gif-input').value;
    }

    let success = result => this.updateGifs(result);
    let error = data => console.log(data);

    fetchGIFS(query, success, error);
  }

  gifPicker() {
    if (this.state.showGIFPicker) {
      return (
        <div className='gif-search-box' style={gifStyle}>
          <div className='row'>
            <form onSubmit={this.sendQuery}>
              <input type='text'
                id='gif-input'
                value={this.state.query}
                placeholder='Search for GIF'
                onChange={this.sendQuery}/>
            </form>
          </div>
          <div className='gif-results'>
            {this.gifResults()}
          </div>
        </div>
      );
    }
  }

  sendGIF(e) {
    this.setState({ showGIFPicker: false });
    this.props.sendGIF(e);
  }

  gifResults() {
    let gifs = this.state.gifs.map((gif,i) => {
      let src = gif.images.fixed_width.url;
      return(
        <li className='gif-index-item' key={i} onClick={this.sendGIF}>
          <img src={src} />
        </li>
      );
    });

    return (
      <ul className='gif-index container'>
        {gifs}
      </ul>
    );
  }

  render() {
    return(
      <div className='gif-input-container'>
        <span className='gif-button' onClick={this.toggleGIF}>GIF</span>
        {this.gifPicker()}
      </div>
    );
  }
}

export default GIFInput;
