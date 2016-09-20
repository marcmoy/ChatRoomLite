import React from 'react';
import Slider from 'react-slick';

const avatars = [
  'captain_falcon', 'dk', 'fox', 'kirby', 'link', 'mario', 'megaman',
  'metaknight', 'peach', 'pikachu', 'pit', 'samus', 'snake', 'sonic', 'yoshi'
];

const Avatars = ({ setAvatar }) => {

  let options = avatars.map(avatar => {
    let src = `/assets/avatars/${avatar}.png`;
    return(
      <div className='avatar-option' key={avatar}>
        <label>
          <input  type='radio' name='avatar'
                  value={avatar} onChange={setAvatar}/>
          <img id='avatar' src={src} />
        </label>
      </div>
    );
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3
      }
    }, {
      breakpoint: 480,
      settings: {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  };

  return(
    <div class='avatar-slider-container'>
      <h3>Select an Avatar</h3>
      <br/>
      <Slider {...settings}>
        {options}
      </Slider>
    </div>
  );
};

export default Avatars;
