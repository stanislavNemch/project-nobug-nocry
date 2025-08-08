//import 'css-star-rating/css/star-rating.css';
//import { StarRating } from 'css-star-rating';
// На вибір
import Raty from 'raty-js';

// Swiper
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getFeedbacks } from './furniture-api.js';

// Нормалізація рейтингу
function normalizeRating(value) {
  if (value >= 3.3 && value <= 3.7) return 3.5;
  if (value >= 3.8 && value <= 4.2) return 4;
  return Math.round(value * 2) / 2; // округлення до 0.5
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await getFeedbacks(1, 10);
    if (!response || !Array.isArray(response.feedbacks)) {
      return;
    }

    console.log('Отримані відгуки з бекенду:', response.feedbacks);

    renderFeedbacks(response.feedbacks);
    initSwiper();
  } catch (err) {
    console.error('Помилка завантаження відгуків:', err);
  }
});

function renderFeedbacks(feedbacks) {
  const container = document.querySelector('.swiper-wrapper');
  if (!container) return;

  container.innerHTML = feedbacks.map((fb, i) => `
    <div class="swiper-slide">
      <div class="review-card">
        <div class="rating-stars" id="rating-${i}"></div>
        <p class="review-text">"${fb.descr}"</p>
        <h3>${fb.name}</h3>
      </div>
    </div>
  `).join('');

  // Ініціалізація зірок
  feedbacks.forEach((fb, i) => {
    new Raty(document.getElementById(`rating-${i}`), {
      readOnly: true,
      half: true,
      starType: 'svg',
      score: normalizeRating(fb.rate)
    });
  });
}

function initSwiper() {
  new Swiper('.swiper', { 
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}
