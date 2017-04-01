export const validateSiginForm = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Enter a email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) errors.password = "Enter a password";
  return errors;
}

export const validateSignupForm = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Enter a email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) errors.password = "Enter a password";
  if (!values.password_confirmation) {
    errors.password_confirmation = 'Enter a password confirmation';
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Password confirmation not match with password';
  }
  return errors;
}