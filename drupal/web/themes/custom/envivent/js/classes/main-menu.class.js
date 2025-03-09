class MainMenu {
  constructor(el) {
    this.opened = false
    this.drawer = el.querySelector('.menu-container')
    this.hamburger = el.querySelector('.hamburger')
    this.hamburger.addEventListener('click', () => {
      this.toggle()
    })

    // Initialize expand buttons for menus
    const menuItems = el.querySelectorAll('li')

    menuItems.forEach(item => {
      const hasChildren = item.querySelectorAll('ul').length

      if (hasChildren) {
        item.classList.add('has-children')
        item.querySelector('a')
          .setAttribute('aria-haspopup', 'true')
        item.querySelector('a')
          .setAttribute('aria-expanded', 'true')

        item.addEventListener('click', (e) => {

          const toggleClicked = e.offsetX > window.innerWidth - 80

          if (toggleClicked) {
            e.preventDefault()

            if (item.classList.contains('active')) {
              item.classList.remove('active')
            } else {
              menuItems.forEach(x => x.classList.remove('active'))
              item.classList.add('active')
            }
          }
        })
      }
    })

    // make parents active
    const active = el.querySelector('.is-active')
    if (active) {
      const parentPage = active.parentNode.parentNode.parentNode

      if (parentPage.classList.contains('has-children')) {
        parentPage.querySelector('a').classList.add('is-active')
      }
    }
  }

  open() {
    this.hamburger.classList.add('active')
    this.drawer.classList.add('active')
    this.opened = true

    // emit event to let other menus know this menu is opening
    const event = new CustomEvent('main-menu-toggle', {
      detail: {
        open: true
      }
    })
    window.dispatchEvent(event)
  }

  close() {
    this.hamburger.classList.remove('active')
    this.drawer.classList.remove('active')
    this.opened = false
    // emit event to let other menus know this menu is closing
    const event = new CustomEvent('main-menu-toggle', {
      detail: {
        open: false
      }
    })
    window.dispatchEvent(event)
  }

  toggle() {
    if (this.opened) {
      this.close()
    } else {
      this.open()
    }
  }
}

export default MainMenu
