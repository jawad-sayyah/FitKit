export interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;

export const emptyForm: CheckoutForm = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

// Returns an object with one message per invalid field ({} means the form is valid)
export function validateCheckout(values: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";

  if (!values.phone.trim()) errors.phone = "Phone is required.";
  else if (!/^[+\d][\d\s\-()]{6,}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number.";

  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";

  if (!values.address.trim()) errors.address = "Street address is required.";
  if (!values.city.trim()) errors.city = "City is required.";
  if (!values.postalCode.trim()) errors.postalCode = "Postal code is required.";
  if (!values.country.trim()) errors.country = "Country is required.";

  return errors;
}

export function generateOrderReference(): string {
  return "FK-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export const ORDER_ANIMATION_MS = 8000;
