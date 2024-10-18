export function repeatPasswordValidator(repeatPassword, password) {
  if (!repeatPassword) return "Repeat password can't be empty."
  if (repeatPassword.length < 5) return "Repeat password must be at least 5 characters long."
  if (repeatPassword !== password) return "Passwords do not match"
  return ''
}
