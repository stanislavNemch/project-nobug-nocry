import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

// Получаем путь к спрайту из уже существующего элемента
function getSpritePath() {
  const existingSvgUse = document.querySelector('use[href*="sprite.svg"]');
  if (existingSvgUse) {
    const href = existingSvgUse.getAttribute('href');
    return href.split('#')[0]; // Убираем #icon-name, оставляем только путь
  }
  // Fallback если не найдено
  return './img/sprite.svg';
}

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const svgUse = question.querySelector('use');
    const isOpen = answer.classList.contains('open');
    const spritePath = getSpritePath(); // Получаем актуальный путь

    // Закрываем все другие элементы
    document.querySelectorAll('.faq-question').forEach(otherQuestion => {
      const otherAnswer = otherQuestion.nextElementSibling;
      const otherSvgUse = otherQuestion.querySelector('use');

      otherAnswer.classList.remove('open');
      otherSvgUse.setAttribute('href', `${spritePath}#chevron-down`);
    });

    // Открываем/закрываем текущий элемент
    if (!isOpen) {
      answer.classList.add('open');
      svgUse.setAttribute('href', `${spritePath}#chevron-up`);
    }
  });
});
