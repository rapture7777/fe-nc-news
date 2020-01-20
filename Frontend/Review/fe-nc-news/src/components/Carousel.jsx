import '../css/Carousel.css';
import news from '../img/news.jpg';

import React, { Component } from 'react';

class Carousel extends Component {
  render() {
    return (
      <section className="Carousel">
        <img src={news} alt="news" />
      </section>
    );
  }
}

export default Carousel;
