// Імпортуємо axios та iziToast
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Основний адрес API
export const BASE_URL = 'https://furniture-store.b.goit.study/api';

// Список всіх ендпоінтів (адрес для запитів)
export const ENDPOINTS = {
  FURNITURES: '/furnitures', // для отримання меблів
  CATEGORIES: '/categories', // для отримання категорій
  ORDERS: '/orders', // для створення замовлень
  FEEDBACKS: '/feedbacks', // для отримання відгуків
};

// Налаштування axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Отримати список меблів
export async function getFurnitures(page = 1, limit = 10, category) {
  try {
    const response = await api.get(ENDPOINTS.FURNITURES, {
      params: { page, limit, category },
    });
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити меблі. Спробуйте пізніше.',
      position: 'topRight',
      timeout: 4000,
    });
    return null;
  }
}

// 2. Отримати всі категорії
export async function getCategories() {
  try {
    const response = await api.get(ENDPOINTS.CATEGORIES);
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message:
        'Не вдалося завантажити категорії. Перевірте підключення до інтернету.',
      position: 'topRight',
      timeout: 4000,
    });
    return null;
  }
}

// 3. Отримати відгуки
export async function getFeedbacks(page = 1, limit = 10) {
  try {
    const response = await api.get(ENDPOINTS.FEEDBACKS, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити відгуки. Спробуйте оновити сторінку.',
      position: 'topRight',
      timeout: 4000,
    });
    return null;
  }
}

// 4. Створити нове замовлення
export async function createOrder(orderInfo) {
  try {
    const response = await api.post(ENDPOINTS.ORDERS, orderInfo);

    // Показуємо успішне сповіщення
    iziToast.success({
      title: 'Успіх!',
      message:
        "Замовлення успішно створено. Ми зв'яжемося з вами найближчим часом.",
      position: 'topRight',
      timeout: 4000,
    });

    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Помилка замовлення',
      message:
        'Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.',
      position: 'topRight',
      timeout: 4000,
    });
    return null;
  }
}
