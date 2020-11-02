export default class SavedCard {
  constructor(mainApi) {
    this.mainApi = mainApi;
  }

  // Функция отвечает за формирование карточки со статьей в личном кабинете
  create(article) {
    const card = document.createElement('div');
    card.classList.add('card');
    const template = `
    <div class="card__icon-container">
      <div class="card__icon card__icon_trash"></div>
      <p class="card__warning card__warning_del">Убрать из сохранённых</p>
      <p class="card__sphere">${article.keyword}</p>
    </div>
    <a href="${article.link}" target="_blank" class="card__link">
      <img src="${article.image}" alt="Фото статьи" class="card__image">
      <div class="card__content">
        <p class="card__date">${article.date}</p>
        <h3 class="card__title">${article.title}</h3>
        <p class="card__text">${article.text}</p>
      </div>
      <p class="card__source">${article.source}</p>
    </a>`;
    card.insertAdjacentHTML('beforeend', template);
    this.card = card;
    const cardIcon = card.querySelector('.card__icon');
    this._setEventListeners(cardIcon, article);
    return card;
  }

  _setEventListeners(cardIcon, article) {
    cardIcon.addEventListener('click', (event) => this._delApiArticle(event, article));
  }

  _delApiArticle(event, article) {
    const card = event.target.closest('.card');
    this.mainApi.deleteArticle(article._id)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
