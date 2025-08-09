//import 'css-star-rating/css/star-rating.css';
//import { StarRating } from 'css-star-rating';
// На вибір
import Raty from 'raty-js';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getFeedbacks } from './furniture-api.js';

function normalizeRating(value) {
  if (value >= 3.3 && value <= 3.7) return 3.5;
  if (value >= 3.8 && value <= 4.2) return 4;
  return Math.round(value * 2) / 2;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await getFeedbacks(1, 10);
    if (!response || !Array.isArray(response.feedbacks)) return;

    renderFeedbacks(response.feedbacks);
    initStars(response.feedbacks);
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
}

function initStars(feedbacks) {
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
  const swiper = new Swiper('.swiper', {
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
    on: {
      slideChange: function () {
        const prevBtn = document.querySelector('.swiper-button-prev');
        const nextBtn = document.querySelector('.swiper-button-next');

        prevBtn.classList.toggle('swiper-button-disabled', this.isBeginning);
        nextBtn.classList.toggle('swiper-button-disabled', this.isEnd);
      }
    }
  });

  // Початкове блокування кнопки "Назад"
  document.querySelector('.swiper-button-prev').classList.add('swiper-button-disabled');
}

