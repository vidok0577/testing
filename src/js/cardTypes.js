const cardTypes = {
  visa: {
    name: "Visa",
    pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    lengths: [13, 16],
  },
  mastercard: {
    name: "Mastercard",
    pattern: /^5[1-5][0-9]{14}$/,
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    lengths: [16],
  },
  mir: {
    name: "Mir",
    pattern: /^220[0-4][0-9]{12}$/,
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.SVG.svg",
    lengths: [16],
  },
  amex: {
    name: "American Express",
    pattern: /^3[47][0-9]{13}$/,
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
    lengths: [15],
  },
  discover: {
    name: "Discover",
    pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg",
    lengths: [16],
  },
};

export default cardTypes;
