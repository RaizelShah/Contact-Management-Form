// frontend/src/utils/validation.js
export const validateContact = (values) => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = "First name is required";
  }

  if (!values.last_name) {
    errors.last_name = "Last name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone_number) {
    errors.phone_number = "Phone number is required";
  } else if (!/^\+?[\d\s-]{10,}$/.test(values.phone_number)) {
    errors.phone_number = "Invalid phone number";
  }

  return errors;
};
