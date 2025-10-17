export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateInstanceName = (name: string): boolean => {
  return name.length >= 3 && name.length <= 50;
};

export const validateMessage = (message: string): boolean => {
  return message.length > 0 && message.length <= 4096;
};
