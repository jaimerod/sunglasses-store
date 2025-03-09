class FixedHeader {
  constructor() {
    this.header = document.querySelector('.layout-container > header')
    this.violator = document.querySelector('.layout-container > .violator')
    this.fixed = false

    this.setOffset()
    this.checkScrollLocation()

    window.onscroll = () => this.checkScrollLocation()
    window.onresize = () => this.setOffset()
  }

  setOffset() {
    this.offset = (this.violator) ? this.violator.clientHeight : 0
  }

  checkScrollLocation() {
    if (!this.fixed && window.pageYOffset >= this.offset) {
      this.fixed = true
      document.body.classList.add('sticky-header')
    } else if (this.fixed && window.pageYOffset < this.offset) {
      this.fixed = false
      document.body.classList.remove('sticky-header')
    }
  }
}
export default FixedHeader
