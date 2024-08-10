const onSignUpPressed = () => {
  const firstNameError = nameValidator(firstName.value)
  const lastNameError = nameValidator(lastName.value)
  const passwordError = passwordValidator(password.value)
  const repeatPasswordError = repeatPasswordValidator(
    repeatPassword.value,
    password.value
  )
  const zipcodeError = zipcodeValidator(zipcode.value)

  if (
    passwordError ||
    repeatPasswordError ||
    firstNameError ||
    lastNameError ||
    zipcodeError
  ) {
    setFirstName({ ...firstName, error: firstNameError })
    setLastName({ ...lastName, error: lastNameError })
    setPassword({ ...password, error: passwordError })
    setRepeatPassword({ ...repeatPassword, error: repeatPasswordError })
    setZipcode({ ...zipcode, error: zipcodeError })
    return
  }

  const userID = generateUserID(firstName.value, lastName.value)

  if (isChecked) {
    // Call the save user API
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email,
      zipcode: zipcode.value,
      password: password.value,
      userID: userID,
    }

    axios
      .post('http://localhost:8080/api/users', userData)
      .then((response) => {
        console.log('User saved:', response.data)
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'WelcomeScreen',
              params: {
                userFirstName: firstName.value,
                userLastName: lastName.value,
                userEmail: email,
              },
            },
          ],
        })
      })
      .catch((error) => {
        console.error('Error saving user:', error)
        // Handle the error (e.g., show a toast message)
      })
  } else {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Dashboard',
          params: {
            userFirstName: firstName.value,
            userLastName: lastName.value,
          },
        },
      ],
    })
  }
}
