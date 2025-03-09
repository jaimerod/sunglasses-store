import 'magnific-popup'
import $ from 'jquery'

// options at: https://dimsemenov.com/plugins/magnific-popup/

class Modal {
  constructor() {
    if (
      document.location.hash !== ''
      && $(document.location.hash).length
      && $(document.location.hash).hasClass('block--type--modal')
    ) {
      $.magnificPopup.open({
        items: {
          src: document.location.hash,
          type: 'inline'
        },
        overflowY: 'scroll'
      })
    }


    $('a').each(function () {
      const href = $(this).attr('href')


      if (
        typeof href !== 'undefined'
        && href.startsWith('#')
        && href.length > 1
        && $(href).hasClass('block--type--modal')
      ) {
        console.log(href)

        $(this).magnificPopup({
          items: {
            src: href,
            type: 'inline'
          },
          //type: 'inline',
          overflowY: 'scroll'
        })
      }

      if (
        typeof href !== 'undefined'
        && href.startsWith('http')
        && $('#popleave').length
      ) {
        $(this).magnificPopup({
          items: {
            src: '#popleave',
            type: 'inline'
          },
          callbacks: {
            open: function() {
              $('#popleave .ok').on('click', function (e) {
                e.preventDefault
                e.stopPropagation
                window.open(href, '_blank')
                $.magnificPopup.close()
                return false
              })

              $('#popleave .cancel').on('click', function (e) {
                e.preventDefault
                e.stopPropagation
                $.magnificPopup.close()
                return false
              })
            }
          }
        })
      }
    })
  }
}

export default Modal
