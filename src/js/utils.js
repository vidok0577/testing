import cardTypes from "./cardTypes";

// Определение типа карты
export function detectCardType(cardNumber) {
  const cleanedNumber = cardNumber.replace(/\s+/g, "");

  for (const [type, data] of Object.entries(cardTypes)) {
    if (data.pattern.test(cleanedNumber)) {
      return type;
    }
  }

  return "unknown";
}

// Валидация номера карты по алгоритму Луна
export function validateCardNumber(cardNumber) {
  const cleanedNumber = cardNumber.replace(/\s+/g, "");

  // Проверка на минимальную длину
  if (cleanedNumber.length < 13) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = cleanedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
