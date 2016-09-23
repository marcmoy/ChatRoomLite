import React from 'react';
import Slider from 'react-slick';
import $ from 'jquery';
import _ from 'lodash';

const avatars = [
  'captain_falcon', 'dk', 'fox', 'kirby', 'link', 'mario', 'megaman',
  'metaknight', 'peach', 'pikachu', 'pit', 'samus', 'snake', 'sonic', 'yoshi'
];

class Avatars extends React.Component {
  constructor(props){
    super(props);
    this.radioButtons = this.radioButtons.bind(this);
  }

  radioButtons() {
      let options = avatars.map((avatar,i) => {
        let src = `/assets/avatars/${avatar}.png`;
        let id = `avatar${i}`;
        return(
          <div className='avatar-option' key={avatar}>
            <label>
              <input  type='radio' name='avatar' id={id}
                      value={avatar} />
              <img id='avatar' src={src} />
            </label>
          </div>
      );
    });

    return options;
  }

  render() {
    return(
      <div className='avatar-slider-container'>
        <h3>Select an Avatar</h3>
        <br/>
        <Slider {...settings}>
          {this.radioButtons()}
        </Slider>
      </div>
    );
  }
}

export default Avatars;

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: _.random(avatars.length),
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
};
