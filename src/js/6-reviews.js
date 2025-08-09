//import 'css-star-rating/css/star-rating.css';
//import { StarRating } from 'css-star-rating';
// На вибір
import Swiper from 'swiper';
//стилі 'swiper'
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
        if (!response || !Array.isArray(response.feedbacks) || response.feedbacks.length === 0) {
            console.log('Відгуки відсутні або дані некоректні.');
            return;
        }

        renderFeedbacks(response.feedbacks);
        initSwiper();
    } catch (err) {
        console.error('Помилка завантаження відгуків:', err);
    }
});

function renderFeedbacks(feedbacks) {
    const container = document.querySelector('.swiper-wrapper');
    if (!container) {
        console.error('Контейнер .swiper-wrapper не знайдено.');
        return;
    }

    container.innerHTML = feedbacks.map((fb) => `
        <div class="swiper-slide">
            <div class="review-card">
                <p class="review-text">"${fb.descr}"</p>
                <h3>${fb.name}</h3>
            </div>
        </div>
    `).join('');
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
     breakpoints: {
      // Планшети (від 768px)
      768: {
        slidesPerView: 2, 
        spaceBetween: 20,
      },
      // Десктопи (від 1440px)
      1440: {
        slidesPerView: 3, 
        spaceBetween: 20,
      },
    },
    });

    const prevBtn = document.querySelector('.swiper-button-prev');
    const nextBtn = document.querySelector('.swiper-button-next');

    // Ручна перевірка та блокування кнопок
    if (prevBtn) prevBtn.classList.toggle('swiper-button-disabled', swiper.isBeginning);
    if (nextBtn) nextBtn.classList.toggle('swiper-button-disabled', swiper.isEnd);

    // Додавання обробників подій для оновлення стану кнопок
    swiper.on('slideChange', function() {
        if (prevBtn) prevBtn.classList.toggle('swiper-button-disabled', this.isBeginning);
        if (nextBtn) nextBtn.classList.toggle('swiper-button-disabled', this.isEnd);
    });
}