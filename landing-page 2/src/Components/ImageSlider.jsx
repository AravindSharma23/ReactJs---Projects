import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "./ImageSlider.css"; // Create this file for custom styles
 import slideImg1 from "../Assets/slideImg1.jpg";
 import slideImg2 from "../Assets/slideImg2.jpg";
import slideImg3 from "../Assets/slideImg3.png";
import slideImg4 from "../Assets/slideImg4.jpg";
import slideImg6 from "../Assets/slideImg6.png";

const ImageSlider = () => {
  const settings = {    
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    cssEase: "linear",
  };
  //{slideImg1,slideImg2,slideImg3,slideImg4,slideImg5}
const images = [slideImg6,slideImg2,slideImg1,slideImg4,slideImg3];
console.log("img",images);
  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} width = ""/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;