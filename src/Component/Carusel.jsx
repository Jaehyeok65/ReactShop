import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Carusel.module.css';
import CardComponent from './CardComponent';
import './Carusel.css';



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background : 'gray' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background : 'gray' }}
      onClick={onClick}
    />
  );
}

const Carusel = ( { Goods }) => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots : false
            }
          }
        ]
      };


    return (
      <div>
      <p className={styles.best}>Weekly Best</p>
      <div className={styles.pcweek}>
      <br/>
      </div>
        <Slider {...settings} className={styles.carusel}>
          { Goods.map( Good => (
            <CardComponent key = {Good.id} url = {Good.url} price = {Good.price} name = {Good.name} id = {Good.id} />
          ))}
        </Slider>
        </div>
    )
}


export default Carusel;