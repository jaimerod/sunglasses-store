import $ from 'jquery'
import 'slick-carousel'

// options at: http://kenwheeler.github.io/slick/

class Carousel {
  constructor(el) {
    $(el).parent().addClass('carousel')

    $(el).slick({
      accessibility: true,
      arrows: false,
      dots: true,
      speed: 1000,
      mobileFirst: true
    })
  }
}

export default Carousel
