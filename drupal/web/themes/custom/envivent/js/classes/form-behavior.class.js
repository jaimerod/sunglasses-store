class FormBehavior {
  constructor(el) {
    this.el = el
    this.submitButton = this.el.querySelector('.webform-button--submit')

    // Add submitted class if it was already tried once
    this.submitButton.addEventListener('click', () => {
      this.checkValidity()
      this.el.classList.add('submitted')
    })

    // Hardcode error messages where we have to
    // @todo cleanup
    // const address = this.el.querySelector('#edit-address-fields-address')
    // const city    = this.el.querySelector('#edit-address-fields-city')
    // const state   = this.el.querySelector('#edit-address-fields-state-province')
    // const zip     = this.el.querySelector('#edit-address-fields-postal-code')

    // if (address !== null) {
    //     address.setAttribute('data-webform-required-error', 'This field is required.')
    // }
    // if (city !== null) {
    //     city.setAttribute(   'data-webform-required-error', 'This field is required.')
    // }
    // if (state !== null) {
    //     state.setAttribute(  'data-webform-required-error', 'This field is required.')
    // }
    // if (zip !== null) {
    //     zip.setAttribute(    'data-webform-required-error', 'This field is required.')
    // }

    // Add error classes for invalid field
    this.fields = this.el.querySelectorAll('.js-form-item')

    this.fields.forEach((field) => {
      const input = field.querySelector('input, select, textarea')

      input.addEventListener('change', () => {
        if (!input.validity.valid) {
          field.classList.add('error')
          field.setAttribute('data-webform-required-error', input.getAttribute('data-webform-required-error'))
        } else {
          field.classList.remove('error')
        }
      })
    })
  }

  checkValidity() {
    this.fields = this.el.querySelectorAll('.js-form-item')

    this.fields.forEach((field) => {
      const input = field.querySelector('input, select, textarea')

      if (!input.validity.valid) {
        field.classList.add('error')
        field.setAttribute('data-webform-required-error', input.getAttribute('data-webform-required-error'))
      } else {
        field.classList.remove('error')
      }
    })
  }
}


export default FormBehavior
