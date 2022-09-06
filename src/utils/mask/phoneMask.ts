import { genericMask } from "./genericMask";

export const formatPhoneNumber = (rawPhone: string): string => {
  const onlyNumbers = rawPhone.replace(/\D/g, '').replace(/^0/, '');

  return genericMask(rawPhone, '(00) 00000-0000');
};