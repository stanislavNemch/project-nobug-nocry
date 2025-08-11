import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { createOrder } from './furniture-api';
// Regular expressions for email and phone validation
const EMAIL_REGEX = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PHONE_REGEX = /^[0-9]{12}$/; // 12 digits only, e.g. 380991232211

// Phone mask helpers: format to +38 (XXX) XXX XX XX while keeping digits-only for submit
function digitsOnly(value) {
  return (value || '').replace(/\D/g, '');
}

function formatUaPhoneFromDigits(digits) {
  // Ensure starts with country prefix 38
  let d = digitsOnly(digits);
  if (!d.startsWith('38')) d = '38' + d;
  // Keep at most 12 digits (+38 + 10 more)
  d = d.slice(0, 12);

  const rest = d.slice(2); // next up to 10 digits
  let out = '+38';
  if (rest.length > 0) out += ' (' + rest.slice(0, Math.min(3, rest.length));
  if (rest.length >= 3) out += ')';
  if (rest.length > 3) out += ' ' + rest.slice(3, Math.min(6, rest.length));
  if (rest.length > 6) out += ' ' + rest.slice(6, Math.min(8, rest.length));
  if (rest.length > 8) out += ' ' + rest.slice(8, Math.min(10, rest.length));
  return out;
}

function attachPhoneMask(inputEl) {
  if (!inputEl) return;

  // Initialize value if empty
  if (!digitsOnly(inputEl.value)) {
    inputEl.value = '+38 ';
  } else {
    inputEl.value = formatUaPhoneFromDigits(inputEl.value);
  }

  inputEl.addEventListener('input', () => {
    const d = digitsOnly(inputEl.value);
    inputEl.value = formatUaPhoneFromDigits(d);
  });

  inputEl.addEventListener('focus', () => {
    if (!digitsOnly(inputEl.value)) inputEl.value = '+38 ';
  });

  inputEl.addEventListener('blur', () => {
    // If only prefix present, clear the field
    if (
      inputEl.value.trim() === '+38' ||
      inputEl.value.trim() === '+38(' ||
      digitsOnly(inputEl.value) === '38'
    ) {
      inputEl.value = '';
    }
  });
}

let selectedModelId = null;
let selectedColor = null;
let orderBackdrop = null;
let orderForm = null;
let closeBtn = null;

const orderCloseButton = document.querySelector('.close-btn');
if (orderCloseButton) {
  orderCloseButton.addEventListener('click', () => {
    orderBackdrop && orderBackdrop.classList.add('visuallyhidden');
    document.body.style.overflow = '';
  });
}

// Function to initialize DOM elements
function initializeElements() {
  orderBackdrop = document.getElementById('order-backdrop');
  orderForm = document.querySelector('.order-form');
  // closeBtn = document.querySelector('.order-modal .close-btn');
  closeBtn = document.querySelector('.close-btn');
}

// Function to open the order modal
export function openOrderModal(modelId, color) {
  // Ensure elements exist before manipulating
  if (!orderBackdrop) {
    initializeElements();
  }

  if (orderBackdrop) {
    orderBackdrop.classList.remove('visuallyhidden');
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

  // Prevent double submit
  const submitBtn = orderForm.querySelector('.submit-btn');
  if (submitBtn) submitBtn.disabled = true;

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

  // Normalize phone to digits-only for validation and submission
  const phoneDigits = digitsOnly(data.phone);
  if (!PHONE_REGEX.test(phoneDigits)) {
    iziToast.error({
      title: 'Validation Error',
      message:
        'Please enter a valid phone like +38 (099) 123 22 11. Digits-only: 12 (e.g., 380991232211).',
      position: 'topRight',
    });
    return;
  }
  data.phone = phoneDigits; // submit digits only

  if (!data.modelId || !data.color) {
    iziToast.error({
      title: 'Error',
      message: 'Could not get furniture details. Please try again.',
      position: 'topRight',
    });
    return;
  }
  console.log('order data', data);
  try {
    const result = await createOrder(data);
    if (result) {
      // Close and reset on success
      closeOrderModal();
    }
  } catch (e) {
    // createOrder already shows a toast on error; just re-enable button
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

// Инициализация обработчиков событий после загрузки DOM
function initializeEventListeners() {
  initializeElements();

  if (orderForm) {
    orderForm.addEventListener('submit', handleFormSubmit);
    // Attach phone mask
    const phoneInput = orderForm.querySelector('input[name="phone"]');
    attachPhoneMask(phoneInput);
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
