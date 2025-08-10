// На вибір
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Виправлений імпорт css-star-rating
import 'css-star-rating/css/star-rating.min.css';

import { getFeedbacks } from './furniture-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function normalizeRating(value) {
  if (value >= 3.3 && value <= 3.7) return 3.5;
  if (value >= 3.8 && value <= 4.2) return 4;
  return Math.round(value * 2) / 2;
}

function createStarRating(rating) {
  const normalizedRating = normalizeRating(rating);
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(normalizedRating);

  let starsHtml = '';

  // Повні зірки
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<span class="star star-full">★</span>';
  }

  // Половинна зірка
  if (hasHalfStar) {
    starsHtml += '<span class="star star-half">★</span>';
  }

  // Порожні зірки
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<span class="star star-empty">★</span>';
  }

  return `<div class="rating-stars" data-rating="${normalizedRating}">${starsHtml}</div>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await getFeedbacks(1, 10);

    if (
      !response ||
      !Array.isArray(response.feedbacks) ||
      response.feedbacks.length === 0
    ) {
      iziToast.warning({
        title: 'Увага',
        message: 'Відгуки відсутні або дані некоректні.',
        position: 'topRight',
        timeout: 4000,
      });
      return;
    }

    renderFeedbacks(response.feedbacks);
    initSwiper();
  } catch (err) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося завантажити відгуки. Спробуйте оновити сторінку.',
      position: 'topRight',
      timeout: 4000,
    });
  }
});

function renderFeedbacks(feedbacks) {
  const container = document.querySelector('.reviews .swiper-wrapper');

  if (!container) {
    iziToast.error({
      title: 'Помилка',
      message: 'Контейнер для відгуків не знайдено.',
      position: 'topRight',
      timeout: 4000,
    });
    return;
  }

  const slidesHTML = feedbacks
    .map(
      fb => `
        <div class="swiper-slide">
            <div class="review-card">
                ${createStarRating(fb.rate)}
                <p class="review-text">"${fb.descr}"</p>
                <h3 class="reviewer-name">${fb.name}</h3>
            </div>
        </div>
    `
    )
    .join('');

  container.innerHTML = slidesHTML;
}

function initSwiper() {
  try {
    const swiperElement = document.querySelector('.reviews .swiper');

    if (!swiperElement) {
      iziToast.error({
        title: 'Помилка',
        message: 'Елемент слайдера відгуків не знайдено.',
        position: 'topRight',
        timeout: 4000,
      });
      return;
    }

    const swiper = new Swiper('.reviews .swiper', {
      modules: [Navigation, Pagination],

      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,

      navigation: {
        nextEl: '.reviews .swiper-button-next',
        prevEl: '.reviews .swiper-button-prev',
      },

      pagination: {
        el: '.reviews .swiper-pagination',
        clickable: true,
      },

      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },

      on: {
        init: function () {
          updateNavigationButtons(this);
        },
        slideChange: function () {
          updateNavigationButtons(this);
        },
      },
    });
  } catch (err) {
    iziToast.error({
      title: 'Помилка',
      message: 'Не вдалося ініціалізувати слайдер відгуків.',
      position: 'topRight',
      timeout: 4000,
    });
  }
}

function updateNavigationButtons(swiper) {
  const prevBtn = document.querySelector('.reviews .swiper-button-prev');
  const nextBtn = document.querySelector('.reviews .swiper-button-next');

  if (prevBtn) {
    prevBtn.classList.toggle('swiper-button-disabled', swiper.isBeginning);
  }
  if (nextBtn) {
    nextBtn.classList.toggle('swiper-button-disabled', swiper.isEnd);
  }
}
