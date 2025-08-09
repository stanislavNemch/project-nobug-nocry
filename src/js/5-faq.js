import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const spritePath = './img/sprite.svg';

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const svgUse = question.querySelector('use');
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-question').forEach(otherQuestion => {
      const otherAnswer = otherQuestion.nextElementSibling;
      const otherSvgUse = otherQuestion.querySelector('use');

      otherAnswer.classList.remove('open');
      otherSvgUse.setAttribute('href', `${spritePath}#chevron-down`);
    });

    if (!isOpen) {
      answer.classList.add('open');
      svgUse.setAttribute('href', `${spritePath}#chevron-up`);
    }
  });
});
