import React from 'react';
import Slider from 'react-slick';
import $ from 'jquery';

const avatars = [
  'captain_falcon', 'dk', 'fox', 'kirby', 'link', 'mario', 'megaman',
  'metaknight', 'peach', 'pikachu', 'pit', 'samus', 'snake', 'sonic', 'yoshi'
];

class Avatars extends React.Component {
  constructor(props){
    super(props);
    this.radioButtons = this.radioButtons.bind(this);
  }

  componentDidMount() {
    let avatar = $('div.slick-slide.slick-active.avatar-option')
                  .find('input')[0].value;
    this.props.setAvatar(avatar);

    $('button').on('click', () => {
      window.setTimeout( () => {
        let av = $('div.slick-slide.slick-active.avatar-option')
          .find('input')[0].value;
        this.props.setAvatar(av);
      }, 500);
    });
  }

  radioButtons() {
      let options = avatars.map((avatar,i) => {
        let src = `/assets/avatars/${avatar}.png`;
        let id = `avatar${i}`;
        return(
          <div className='avatar-option' key={avatar}>
            <label>
              <input  type='radio' name='avatar' id={id}
                      value={avatar} onChange={this.props.setAvatar}/>
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
  initialSlide: 7,
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