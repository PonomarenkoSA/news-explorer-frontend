export default class NewsCard {
  constructor(mainApi, getCardDate) {
    this.mainApi = mainApi;
    this.getCardDate = getCardDate;
  }

  // Функция создает карточку
  create(article, keyWord) {
    const card = document.createElement('div');
    card.classList.add('card');
    this.cardDate = this.getCardDate(article.publishedAt);
    const template = `
    <div class="card__icon-container">
      <div class="card__icon card__icon_unsaved"></div>
      <p class="card__warning card__warning_save">Войдите, чтобы сохранять статьи</p>
    </div>
    <a href="${article.url}" target="_blank" class="card__link">
      <img src="${article.urlToImage}" alt="Фото статьи" class="card__image">
      <div class="card__content">
        <p class="card__date">${this.cardDate}</p>
        <h3 class="card__title">${article.title}</h3>
        <p class="card__text">${article.description}</p>
      </div>
      <p class="card__source">${article.source.name}</p>
    </a>`;
    card.insertAdjacentHTML('beforeend', template);
    const cardIcon = card.querySelector('.card__icon');
    const cardWarning = card.querySelector('.card__warning_save');
    this._renderIcon(cardIcon, cardWarning, keyWord, article);
    return card;
  }

  _renderIcon(cardIcon, cardWarning, keyWord, article) {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      cardWarning.classList.add('card__warning_hidden');
      this._setEventListener(cardIcon, cardWarning, keyWord, article);
    }
  }

  _setEventListener(cardIcon, cardWarning, keyWord, article) {
    cardIcon.addEventListener('click', (event) => this._saveArticle(event, cardWarning, keyWord, article));
  }

  _saveArticle(event, cardWarning, keyWord, article) {
    if (!article.id) {
      this._sendApiArticle(event, cardWarning, keyWord, article);
    } else {
      this._delApiArticle(event, cardWarning, keyWord, article);
    }
  }

  // Статья направляется для сохранения в адрес API
  _sendApiArticle(event, cardWarning, keyWord, article) {
    this.mainApi.createArticle(
      keyWord,
      article.title,
      article.description,
      this.cardDate,
      article.source.name,
      article.url,
      article.urlToImage,
    )
      .then((res) => {
        article.id = res.id;
        event.target.classList.remove('card__icon_unsaved');
        event.target.classList.add('card__icon_saved');
      })
      .catch(() => {
        cardWarning.textContent = 'Не удалось сохранить. Ошибка сервера';
        cardWarning.classList.remove('card__warning_hidden');
        setTimeout(this._changeMessage, 5000);
      });
  }

  // Статья направляется для удаления в адрес API
  _delApiArticle(event, cardWarning, keyWord, article) {
    this.mainApi.deleteArticle(article.id)
      .then(() => {
        article.id = null;
        event.target.classList.add('card__icon_unsaved');
        event.target.classList.remove('card__icon_saved');
      })
      .catch(() => {
        cardWarning.textContent = 'Не удалось удалить. Ошибка сервера';
        cardWarning.classList.remove('card__warning_hidden');
        setTimeout(this._changeMessage, 5000, cardWarning);
      });
  }

  _changeMessage() {
    cardWarning.textContent = 'Войдите, чтобы сохранять статьи';
    cardWarning.classList.add('card__warning_hidden');
  }
}
