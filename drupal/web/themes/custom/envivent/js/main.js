import $ from 'jquery'
import 'magnific-popup'
import './classes/polyfills.class.js'
import AnchorScroller from './classes/anchor-scroller'
import AOS from 'aos'
import CollapsibleItem from './classes/collapsible-item.class.js'
import FixedHeader from './classes/fixed-header.class'
import FixedIsi from './classes/fixed-isi.js'
import FormBehavior from './classes/form-behavior.class.js'
import MainMenu from './classes/main-menu.class.js'
import Carousel from './classes/carousel.class.js'
import Modal from './classes/modal.class.js'
import Violator from './classes/violator.class'

// Initialize Animate on Scroll
AOS.init({
  duration: 1200,
})

// Initialize AnchorScroller
const scroll = new AnchorScroller(
  $('header[role=banner]').height(),
  $('header[role=banner]').height(),
  768
)
scroll.init()

$(window).on('resize', function () {
  if ($('html').hasClass('enable_sticky_desktop')) {
    scroll.desktopOffset = $('header[role=banner]').height()
  }

  if ($('html').hasClass('enable_sticky_desktop')) {
    scroll.mobileOffset = $('header[role=banner]').height()
  }
}).trigger('resize')


// Initialize Modal Class
new Modal()

$(() => {
  // Prevent scroll to modal after click
  $('a').each(function () {
    const href = $(this).attr('href')

    if (
      typeof href !== 'undefined'
      && href.startsWith('#')
      && $(href).hasClass('block--type--modal')
    ) {
      $(this).on('click', (e)=> e.stopImmediatePropagation())
    }
  })

  const isi = document.querySelector('.isi .fixed')
  if (isi) {
    new FixedIsi()
  }

  const violator = document.querySelector('.violator')
  if (violator) {
    new Violator(violator)
  }

  new FixedHeader()

  const mainMenu = document.querySelector('.layout-container > header')
  if (mainMenu) {
    new MainMenu(mainMenu)
  }

  // Don't active slideshows on the Layout Builder page
  if (
    $('.block--type--carousel-slide').length
    && !$('.node-page-layout-builder-form').length
  ) {
    $.uniqueSort(
      $('.block--type--carousel-slide')
        .parents('.layout__region')
    )
      .css({
        'min-width': 0
      })
      .each(function () {
        new Carousel(this)
      })
  }

  document.querySelectorAll('.webform-submission-form').forEach(f => {
    new FormBehavior(f)
  })

  document.querySelectorAll('.block--type--collapsible-item').forEach(item => {
    new CollapsibleItem(item)
  })

  if ($('.popup-youtube').length) {
    $('.popup-youtube').magnificPopup({
      type: 'iframe',
      iframe: {
        patterns: {
          youtube: {
            index: 'youtube.com/',
            id: 'v=',
            src: '//www.youtube.com/embed/%id%?autoplay=1&modestbranding=1'
          }
        }
      },
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    })
  }
})
