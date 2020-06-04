const form = document.getElementById('review-form');
const textArea = document.getElementById('review');
const button = document.getElementById('submit');
const reviewsList = document.getElementById('reviews-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!textArea.value) return;

  const name = 'Sample text';

  const li = document.createElement('li');
  li.className = 'last-reviews__item';
  li.innerHTML = `<div class="last-reviews__comment comment">
  <div class="comment__header">
    <a href="#" class="comment__name">${name}</a>
    <span class="comment__date">${getDate()}</span>
  </div>
  <p class="comment__text">${textArea.value}</p>
  </div>`;

  reviewsList.append(li);

  textArea.value = '';
});

// Event 'submit' by pressing Ctrl + Enter
textArea.addEventListener('keydown', (e) => {
  const event = new Event('submit', {
    cancelable: true,
  });

  if (e.keyCode === 13 && e.ctrlKey) {
    form.dispatchEvent(event);
  }
});

function getDate() {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const date = new Date();

  // dd.mm.yyyy => dd month yyyy
  return date
    .toLocaleDateString()
    .replace(/\.\d\d\./, ` ${months[date.getMonth()]} `);
}
