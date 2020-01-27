import '../css/Carousel.css';
import mist from '../img/bg-masthead copy.jpg';
import mountains from '../img/top_background copy.jpeg';
import code from '../img/code_screen copy.png';
import { Carousel } from 'react-bootstrap';
import React, { Component } from 'react';

class DisplayCarousel extends Component {
  render() {
    return (
      <Carousel className="Carousel">
        <Carousel.Item className="Item">
          <img src={mist} alt="code" />
          <Carousel.Caption className="Caption">
            <h4>Welcome to ncNews!</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="Item">
          <img src={mountains} alt="mountains" />
          <Carousel.Caption>
            <h4>The latest news stories...</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="Item">
          <img src={code} alt="code" />
          <Carousel.Caption>
            <h4>Trends in the industry...</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default DisplayCarousel;
