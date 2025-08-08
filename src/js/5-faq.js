import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const svgUse = question.querySelector('use');
    const isOpen = answer.style.display === 'block';

    document.querySelectorAll('.faq-question').forEach(otherQuestion => {
      const otherAnswer = otherQuestion.nextElementSibling;
      const otherSvgUse = otherQuestion.querySelector('use');

      otherAnswer.style.display = 'none';
      otherSvgUse.setAttribute('href', '#down-arrow-alt');
    });

    if (!isOpen) {
      answer.style.display = 'block';
      svgUse.setAttribute('href', '#up-arrow-alt');
    }
  });
});
