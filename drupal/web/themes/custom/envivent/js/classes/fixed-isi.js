class FixedIsi {
  constructor() {
    this.fixed_isi         = document.querySelector('.isi .fixed')
    this.fixed_isi_height  = this.fixed_isi.clientHeight
    this.static_isi        = document.querySelector('#isi')
    this.static_isi_offset = 0

    window.addEventListener('scroll', () => {
      this.hideShowISI()
    })

    this.hideShowISI()
  }

  calculateOffset() {
    this.static_isi_offset = this.static_isi.getBoundingClientRect().top + this.fixed_isi_height - window.innerHeight + window.scrollY
  }

  hideShowISI() {
    this.calculateOffset()

    if (window.pageYOffset > this.static_isi_offset) {
      this.fixed_isi.classList.add('hidden')
    } else {
      this.fixed_isi.classList.remove('hidden')
    }
  }
}

export default FixedIsi
