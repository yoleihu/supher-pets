import libphonenumber from 'google-libphonenumber';

export const validatePhone = (value: string) => {
  const number = value.replace(/\D/g, '');

  if (number.length > 2) {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const numbericPhone = phoneUtil.parseAndKeepRawInput(number, 'BR');

    if (phoneUtil.isValidNumberForRegion(numbericPhone, 'BR')) {
      return true
    }
  }
  
  return false;
};