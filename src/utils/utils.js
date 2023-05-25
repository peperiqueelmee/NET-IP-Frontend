const validateRut = rut => {
  //The format must be without points and with hyphen, example: 10123456-0
  if (rut.indexOf('-') === -1) return false;
  rut = rut.replace(/\./g, '').replace(/-/g, '');
  let dv = rut.slice(-1).toUpperCase();
  let rutSinDV = rut.slice(0, -1);
  if (!/^\d+$/.test(rutSinDV)) return false;
  let suma = 0,
    factor = 2;
  for (let i = rutSinDV.length - 1; i >= 0; i--) {
    suma += factor * rutSinDV.charAt(i);
    factor = factor === 7 ? 2 : factor + 1;
  }
  let dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 11) dvEsperado = '0';
  else if (dvEsperado === 10) dvEsperado = 'K';
  else dvEsperado = dvEsperado.toString();
  return dv === dvEsperado;
};

const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const ValidatePasswordStrength = password => {
  // The password must be between 6 and 10 characters long
  // and must contain at least one uppercase letter, one lowercase letter, and one number.
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,10}$/;
  return regex.test(password);
};

const isInputInvalid = (input, validationType) => {
  const validationMap = {
    password: () => !ValidatePasswordStrength(input.value),
    email: () => !validateEmail(input.value),
    rut: () => !validateRut(input.value),
    extension: () => !validateNumberAnex(input.value, 1000, 9999),
    default: () => !input.value,
  };
  const validationFunction =
    validationMap[validationType] ?? validationMap.default;
  return validationFunction();
};

const validateNumberAnex = (number, rangeMin, RangoMax) => {
  return !isNaN(number) && number >= rangeMin && number <= RangoMax;
};

const RESPONSE_SERVER = {
  BAD_REQUEST: 'ERR_BAD_REQUEST',
};

export { isInputInvalid, RESPONSE_SERVER };
