export function validate(form) {
  const error = {};

  if (!form.fullName) {
    error.fullName = "Name is required";
  }
  if (!form.phone) {
    error.phone = "phone is required";
  } else if (!/^\+251\d{9}$/.test(form.phone)) {
    error.phone = "phone is not Ethiopian Standard";
  }
  if (!form.email) {
    error.email = "email is requireq";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    error.email = "Please enter a valid email address";
  }
  if (!form.address) {
    error.address = "Address is Requireq";
  }
  if (!form.city) {
    error.city = "city is required";
  }
  return error;
}
