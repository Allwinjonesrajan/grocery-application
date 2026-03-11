import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1, 
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,  
};

const imageStyle = {
  width: '100%',
  height: '400px', 
  objectFit: 'cover',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};

return (
  <div style={{ width: "100%", margin: "20px auto 0px auto" }}>
    <Slider {...settings}>
      <div>
        <img 
        src="https://i.pinimg.com/736x/7f/ec/a4/7feca4eb8ed51c38962739c87b1764b3.jpg"
          alt="img"
          style={imageStyle}
        />
      </div>
      <div>
        <img 
          src="https://i.pinimg.com/736x/69/f9/aa/69f9aa94b4ca40bd91e3d324b99dc8cf.jpg" 
          alt="img"
          style={imageStyle}
        />
      </div>
      <div>
        <img 
          src="https://i.pinimg.com/736x/a0/7d/e6/a07de6dd18e3a7512e04bef0205bc32c.jpg" 
          alt="img"
          style={imageStyle}
        />
      </div>
      <div>
        <img 
          src="https://i.pinimg.com/736x/0a/6b/e7/0a6be783b04b9c3ec6f507063e354e96.jpg" 
          alt="img"
          style={imageStyle}
        />
      </div>
    </Slider>
  </div>
);
}

export default Carousel;