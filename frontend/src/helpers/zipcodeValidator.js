export function zipcodeValidator(zipcode) {
    if (!zipcode) return "Zipcode can't be empty."
    if (zipcode.length < 5) return 'Zipcode must be 5 numbers.'
    return ''
  }