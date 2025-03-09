class Violator {
  constructor(el) {
    this.violator = el
    this.closeBtn = this.violator.querySelector('button')

    this.closeBtn.addEventListener('click', () => {
      sessionStorage.setItem('violator', '1')
      this.close()
    })

    if (sessionStorage.getItem('violator') !== null) {
      this.close()
    } else {
      this.open()
    }
  }
  open() {
    this.violator.classList.add('active')
    document.body.classList.add('violator-active')
  }
  close() {
    this.violator.classList.remove('active')
    document.body.classList.remove('violator-active')
  }
}

export default Violator
