import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { createOrder } from './furniture-api';

const EMAIL_REGEX = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PHONE_REGEX = /^[0-9]{12}$/;

let keydownHandler = null;
let clickHandler = null;
let formSubmitHandler = null;

function digitsOnly(value) {
  return (value || '').replace(/\D/g, '');
}

function formatUaPhoneFromDigits(digits) {
  let d = digitsOnly(digits);
  if (!d.startsWith('38')) d = '38' + d;
  d = d.slice(0, 12);

  const rest = d.slice(2);
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

const createKeydownHandler = () => event => {
  if (event.key === 'Escape') {
    closeOrderModal();
  }
};

const createClickHandler = () => event => {
  if (event.target === orderBackdrop || event.target === closeBtn) {
    closeOrderModal();
  }
};

const addOrderEventListeners = () => {
  if (!keydownHandler) {
    keydownHandler = createKeydownHandler();
  }
  if (!clickHandler) {
    clickHandler = createClickHandler();
  }

  document.addEventListener('keydown', keydownHandler);
  if (orderBackdrop) {
    orderBackdrop.addEventListener('click', clickHandler);
  }
};

const removeOrderEventListeners = () => {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
  }
  if (clickHandler && orderBackdrop) {
    orderBackdrop.removeEventListener('click', clickHandler);
  }
};

function initializeElements() {
  orderBackdrop = document.getElementById('order-backdrop');
  orderForm = document.querySelector('.order-form');
  closeBtn = document.querySelector('.close-btn');
}

export function openOrderModal(modelId, color) {
  if (!orderBackdrop) {
    initializeElements();
  }

  if (orderBackdrop) {
    orderBackdrop.classList.remove('visuallyhidden');
    document.body.style.overflow = 'hidden';
    selectedModelId = modelId;
    selectedColor = color;
    addOrderEventListeners();
  }
}

const closeOrderModal = () => {
  if (orderBackdrop) {
    orderBackdrop.classList.add('visuallyhidden');
    document.body.style.overflow = '';
  }
  if (orderForm) {
    orderForm.reset();
  }
  removeOrderEventListeners();
};

async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const data = Object.fromEntries(formData);

  const submitBtn = orderForm.querySelector('.submit-btn');
  if (submitBtn) submitBtn.disabled = true;

  let isValid = true;

  if (!EMAIL_REGEX.test(data.email)) {
    iziToast.error({
      title: 'Validation Error',
      message: 'Please enter a valid E-mail address.',
      position: 'topRight',
    });
    isValid = false;
  }

  const phoneDigits = digitsOnly(data.phone);
  if (!PHONE_REGEX.test(phoneDigits)) {
    iziToast.error({
      title: 'Validation Error',
      message: 'Please enter a valid phone number.',
      position: 'topRight',
    });
    isValid = false;
  }
  data.phone = phoneDigits;

  if (!data.comment || data.comment.trim() === '') {
    iziToast.error({
      title: 'Validation Error',
      message: 'Please enter a comment.',
      position: 'topRight',
    });
    isValid = false;
  }

  if (!selectedModelId || !selectedColor) {
    iziToast.error({
      title: 'Error',
      message: 'Could not get furniture details. Please try again.',
      position: 'topRight',
    });
    isValid = false;
  }

  if (!isValid) {
    if (submitBtn) submitBtn.disabled = false;
    return;
  }

  // Створення об'єкта для відправки на бекенд тільки з необхідними даними
  const orderData = {
    email: data.email,
    phone: data.phone,
    comment: data.comment,
    modelId: selectedModelId,
    color: selectedColor,
  };

  try {
    const result = await createOrder(orderData);
    if (result) {
      closeOrderModal();
    }
  } catch (e) {
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

function initializeEventListeners() {
  initializeElements();

  if (orderForm) {
    if (!formSubmitHandler) {
      formSubmitHandler = handleFormSubmit;
    }
    orderForm.addEventListener('submit', formSubmitHandler);

    const phoneInput = orderForm.querySelector('input[name="phone"]');
    attachPhoneMask(phoneInput);
  }
}

const orderCloseButton = document.querySelector('.close-btn');
if (orderCloseButton) {
  orderCloseButton.addEventListener('click', closeOrderModal);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
  initializeEventListeners();
}