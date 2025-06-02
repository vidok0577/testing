import { detectCardType, validateCardNumber } from "../utils";

const setDetectCard = [
  ["4929733032396729", "visa", true],
  ["5590135090399873", "mastercard", true],
  ["341444637193234", "amex", true],
  ["6011810435464546", "discover", true],
  ["2200450150311554", "mir", true],
  ["5555555555555555", "mastercard", false],
  ["asdfasdfasdfasdf", "unknown", false],
  [" ", "unknown", false],
];

test.each(setDetectCard)("testing detectCardType %s", (card, brand) => {
  const result = detectCardType(card);
  expect(result).toEqual(brand);
});

test.each(setDetectCard)("testing validateCardNumber %s", (card, _, detect) => {
  const result = validateCardNumber(card);
  expect(result).toEqual(detect);
});
