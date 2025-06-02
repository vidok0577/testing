import cardTypes from "./cardTypes";
import { detectCardType, validateCardNumber } from "./utils";

// DOM элементы
const cardNumberInput = document.querySelector(".card-input");
const validateBtn = document.querySelector(".validate-btn");
const validationResult = document.querySelector(".validation-result");
const cardIconsContainer = document.querySelector(".card-icons");
let cardIcons = [];

// Инициализация приложения
function initApp() {
  createCardIcons();
  setupEventListeners();
}

// Создание иконок платежных систем
function createCardIcons() {
  for (const type in cardTypes) {
    const icon = document.createElement("img");
    icon.className = "card-icon";
    icon.dataset.type = type;
    icon.alt = cardTypes[type].name;
    icon.src = cardTypes[type].icon;
    cardIcons.push(icon);
  }
  cardIconsContainer.append(...cardIcons);
}

// Настройка обработчиков событий
function setupEventListeners() {
  validateBtn.addEventListener("click", handleValidation);
  cardNumberInput.addEventListener("input", formatCardNumber);
  cardNumberInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") handleValidation();
  });
}

// Форматирование номера карты (добавление пробелов)
function formatCardNumber() {
  let value = cardNumberInput.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  let formatted = "";

  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += " ";
    formatted += value[i];
  }

  cardNumberInput.value = formatted;

  updateCardIcons(value);
}

// Обновление иконок платежных систем
function updateCardIcons(cardNumber) {
  const detectedType = detectCardType(cardNumber);

  cardIcons.forEach((icon) => {
    if (icon.dataset.type === detectedType) {
      icon.classList.add("active");
    } else {
      icon.classList.remove("active");
    }
  });
}

// Обработка валидации
function handleValidation() {
  const cardNumber = cardNumberInput.value;
  const cleanedNumber = cardNumber.replace(/\s+/g, "");
  const detectedType = detectCardType(cleanedNumber);
  const isValid = validateCardNumber(cleanedNumber);

  showValidationResult(cardNumber, detectedType, isValid);
}

// Отображение результата валидации
function showValidationResult(cardNumber, cardType, isValid) {
  // Сбрасываем предыдущий результат
  validationResult.className = "validation-result";

  if (cardNumber.trim() === "") {
    validationResult.textContent = "Please enter a card number";
    validationResult.classList.add("invalid");
    return;
  }

  if (isValid) {
    validationResult.innerHTML = `
      <i class="fas fa-check-circle"></i> Valid Card
      <div class="result-details">
        <img src="${cardTypes[cardType]?.icon || ""}" alt="${cardType}" class="card-type-img">
        <span class="card-type-name">${cardTypes[cardType]?.name || "Unknown Card Type"}</span>
      </div>
    `;
    validationResult.classList.add("valid");
  } else {
    validationResult.innerHTML = `
      <i class="fas fa-times-circle"></i> Invalid Card Number
      <p class="error-detail">Please check the number and try again</p>
    `;
    validationResult.classList.add("invalid");
  }
  console.log(validationResult.textContent);
}

// Инициализация приложения при загрузке
document.addEventListener("DOMContentLoaded", initApp);
