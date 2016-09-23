import React from 'react';
import { fetchGIFS } from '../../util/gif_api';

const gifStyle = {
  position: 'fixed',
  right: '5%', bottom: '10%',
  backgroundColor: 'white',
  width: '50%',
  height: '50vh',
  padding: '.3em .6em',
  border: '1px solid #ccc',
  borderRadius: '5px',
  zIndex: '2'
};

class GIFInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', gifs: [], showGIFPicker: false };
    this.toggleGIF = this.toggleGIF.bind(this);
    this.updateGifs = this.updateGifs.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
    this.gifPicker = this.gifPicker.bind(this);
    this.gifResults = this.gifResults.bind(this);
  }

  toggleGIF() {
    if (this.state.showGIFPicker) {
      this.setState({ showGIFPicker: false });
    } else {
      this.setState({ showGIFPicker: true });
    }
  }

  updateGifs(result) {
    this.setState({ gifs: result.data });
  }

  updateQuery(e) {
    this.setState({ query: e.target.value });
  }

  sendQuery(e) {
    e.preventDefault();
    let success = result => this.updateGifs(result);
    let error = data => console.log(data);

    fetchGIFS(this.state.query, success, error);
  }

  gifPicker() {
    if (this.state.showGIFPicker) {
      return (
        <div className='gif-search-box' style={gifStyle}>
          <div className='row'>
            <form onSubmit={this.sendQuery}>
              <input type='text'
                value={this.state.query}
                placeholder='Search for GIF'
                onChange={this.updateQuery}/>
            </form>
          </div>
          <div className='gif-results'>
            {this.gifResults()}
          </div>
        </div>
      );
    }
  }

  gifResults() {
    let gifs = this.state.gifs.map((gif,i) => {
      let src = gif.images.fixed_width_small.url;
      return(
        <li className='gif-index-item' key={i}>
          <img src={src} />
        </li>
      );
    });

    return (
      <ul className='gif-index'>
        {gifs}
      </ul>
    );
  }

  render() {
    return(
      <div className='gif-input-container'>
        <button className='gif-button' onClick={this.toggleGIF}>GIF</button>
        {this.gifPicker()}
      </div>
    );
  }
}

export default GIFInput;
