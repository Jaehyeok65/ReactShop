import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Carusel.module.css';
import CardComponent from './CardComponent';





const Carusel = ( { Goods }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
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
        <Slider {...settings} className={styles.carusel}>
          { Goods.map( Good => (
            <CardComponent key = {Good.id} url = {Good.url} price = {Good.price} />
          ))}
        </Slider>
    )
}


export default Carusel;