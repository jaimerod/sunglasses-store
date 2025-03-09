import $ from 'jquery'
class CollapsibleItem {
  constructor(el) {
    this.el = el
    this.toggler  = el.querySelector('.toggle')
    this.heading  = el.querySelector('.toggle + .collapsible-button')
    this.content  = el.querySelector('.collapsible-content')
    this.grouping = el.dataset.grouping
    this.delay    = 500

    this.toggler.addEventListener('click', () => this.toggle())
    this.heading.addEventListener('click', () => this.toggle())
  }

  open() {
    this.el.classList.add('opened')
    $(this.content).stop(true, false).slideDown(this.delay, () => {
      const rect = this.el.getBoundingClientRect()
      const header  = document.querySelector('.menu-container')
      const yOffset = (header.clientHeight + 16) * -1
      const y = rect.top + window.pageYOffset + yOffset

      if (rect.y < yOffset * -1) {
        window.scrollTo({top: y, behavior: 'smooth'})
      }
    })
  }

  close() {
    this.el.classList.remove('opened')
    $(this.content).stop(true, false).slideUp(this.delay)
  }

  toggle() {
    if (this.isOpened()) {
      this.close()
    } else {
      this.closeAll()
      this.open()
    }
  }

  closeAll() {
    $('[data-grouping="' + this.grouping + '"]')
      .removeClass('opened')
      .find('.collapsible-content')
      .slideUp(this.delay)
  }

  isOpened() {
    return this.el.classList.contains('opened')
  }
}

export default CollapsibleItem
