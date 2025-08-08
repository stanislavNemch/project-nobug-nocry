import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { selectedColor, selectedModelId } from './modal';

// Regular expressions for email and phone validation
const EMAIL_REGEX = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PHONE_REGEX = /^[0-9]{12}$/;

// DOM element selectors
const orderBackdrop = document.getElementById('order-backdrop');
const orderForm = document.querySelector('.order-form');
const closeBtn = document.querySelector('.order-modal .close-btn');

let selectedModelId = null;
let selectedColor = null;

// Function to open the order modal
export function openOrderModal(modelId, color) {
  orderBackdrop.classList.remove('visuallyhidden');
  document.body.style.overflow = 'hidden';
  selectedModelId = modelId;
  selectedColor = color;
}

// Function to close the order modal
const closeOrderModal = () => {
  orderBackdrop.classList.add('visuallyhidden');
  document.body.style.overflow = '';
  orderForm.reset();
};

const handleCloseClick = (event) => {
  if (event.target === orderBackdrop || event.target === closeBtn) {
    closeOrderModal();
  }
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && !orderBackdrop.classList.contains('visuallyhidden')) {
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
      position: 'topRight'
    });
    return;
  }

  if (!PHONE_REGEX.test(data.phone)) {
    iziToast.error({
      title: 'Validation Error',
      message: 'Please enter a valid 12-digit phone number (e.g., 380961234568).',
      position: 'topRight'
    });
    return;
  }

  if (!data.modelId || !data.color) {
    iziToast.error({
      title: 'Error',
      message: 'Could not get furniture details. Please try again.',
      position: 'topRight'
    });
    return;
  }

  try {
    const response = await axios.post('https://furniture-store.b.goit.study/api/orders', data);
    
    iziToast.success({
      title: 'Success!',
      message: 'Your order has been successfully placed.',
      position: 'topRight'
    });
    
    closeOrderModal();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.response?.data?.message || 'Failed to send order. Please try again later.',
      position: 'topRight'
    });
  }
}

orderForm.addEventListener('submit', handleFormSubmit);
orderBackdrop.addEventListener('click', handleCloseClick);
document.addEventListener('keydown', handleKeydown);