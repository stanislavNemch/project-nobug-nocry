import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

// Ждем загрузки DOM перед инициализацией
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const svgUse = question.querySelector('use');
      const isOpen = answer.classList.contains('open');

      if (isOpen) {
        // Закрываем текущий элемент
        answer.classList.remove('open');
        if (svgUse) {
          const currentHref = svgUse.getAttribute('href');
          if (currentHref) {
            const basePath = currentHref.split('#')[0];
            svgUse.setAttribute('href', `${basePath}#chevron-down`);
          }
        }
      } else {
        // Сначала закрываем все остальные элементы
        document.querySelectorAll('.faq-question').forEach(otherQuestion => {
          if (otherQuestion !== question) {
            const otherAnswer = otherQuestion.nextElementSibling;
            const otherSvgUse = otherQuestion.querySelector('use');

            if (otherAnswer.classList.contains('open')) {
              otherAnswer.classList.remove('open');

              if (otherSvgUse) {
                const currentHref = otherSvgUse.getAttribute('href');
                if (currentHref) {
                  const basePath = currentHref.split('#')[0];
                  otherSvgUse.setAttribute('href', `${basePath}#chevron-down`);
                }
              }
            }
          }
        });

        // Открываем текущий элемент
        answer.classList.add('open');
        if (svgUse) {
          const currentHref = svgUse.getAttribute('href');
          if (currentHref) {
            const basePath = currentHref.split('#')[0];
            svgUse.setAttribute('href', `${basePath}#chevron-up`);
          }
        }
      }
    });
  });
});
