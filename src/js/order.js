import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { createOrder } from './furniture-api';
// Regular expressions for email and phone validation
const EMAIL_REGEX = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PHONE_REGEX = /^[0-9]{12}$/;

let selectedModelId = null;
let selectedColor = null;
let orderBackdrop = null;
let orderForm = null;
let closeBtn = null;

const orderCloseButton = document.querySelector('.close-btn');
console.log(orderCloseButton);

orderCloseButton.addEventListener('click', () => {
  orderBackdrop.classList.add('visuallyhidden');
  document.body.style.overflow = '';
});

// Function to initialize DOM elements
function initializeElements() {
  orderBackdrop = document.getElementById('order-backdrop');
  orderForm = document.querySelector('.order-form');
  // closeBtn = document.querySelector('.order-modal .close-btn');
  closeBtn = document.querySelector('.close-btn');
}

// Function to open the order modal
export function openOrderModal(modelId, color) {
  orderBackdrop.classList.remove('visuallyhidden');
  // Убедимся, что элементы инициализированы
  if (!orderBackdrop) {
    initializeElements();
  }

  if (orderBackdrop) {
    // orderBackdrop.classList.remove('visuallyhidden');
    document.body.style.overflow = 'hidden';
    selectedModelId = modelId;
    selectedColor = color;
  }
}

// Function to close the order modal
const closeOrderModal = () => {
  if (orderBackdrop) {
    orderBackdrop.classList.add('visuallyhidden');
    document.body.style.overflow = '';
  }
  if (orderForm) {
    orderForm.reset();
  }
};

const handleCloseClick = event => {
  if (event.target === orderBackdrop || event.target === closeBtn) {
    closeOrderModal();
  }
};

const handleKeydown = event => {
  if (
    event.key === 'Escape' &&
    orderBackdrop &&
    !orderBackdrop.classList.contains('visuallyhidden')
  ) {
    closeOrderModal();
  }
};

// Form submission handler
async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const data = Object.fromEntries(formData);

  data.modelId = selectedModelId;
  data.color = selectedColor;

  if (!EMAIL_REGEX.test(data.email)) {
    iziToast.error({
      title: 'Validation Error',
      message: 'Please enter a valid E-mail address.',
      position: 'topRight',
    });
    return;
  }

  if (!PHONE_REGEX.test(data.phone)) {
    iziToast.error({
      title: 'Validation Error',
      message:
        'Please enter a valid 12-digit phone number (e.g., 380961234568).',
      position: 'topRight',
    });
    return;
  }

  if (!data.modelId || !data.color) {
    iziToast.error({
      title: 'Error',
      message: 'Could not get furniture details. Please try again.',
      position: 'topRight',
    });
    return;
  }
  console.log('order data', data);

  createOrder(data);
}

// Инициализация обработчиков событий после загрузки DOM
function initializeEventListeners() {
  initializeElements();

  if (orderForm) {
    orderForm.addEventListener('submit', handleFormSubmit);
  }

  if (orderBackdrop) {
    orderBackdrop.addEventListener('click', handleCloseClick);
  }

  document.addEventListener('keydown', handleKeydown);
}

// Запускаем инициализацию после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
  // DOM уже загружен
  initializeEventListeners();
}
