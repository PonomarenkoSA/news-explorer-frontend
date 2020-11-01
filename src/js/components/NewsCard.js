import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(mainApi, getCardDate) {
    super();
    this.mainApi = mainApi;
    this.getCardDate = getCardDate;
    this._id = null;
  }

  create(article, keyWord) {
    const card = document.createElement('div');
    this.article = article;
    this.keyWord = keyWord;
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
    this.cardItem = card;
    this.cardIcon = this.cardItem.querySelector('.card__icon');
    this.cardWarning = this.cardItem.querySelector('.card__warning_save');
    this._renderIcon();
    console.log('GHGHGHGHGH', card);
    return card;
  }

  _renderIcon() {
    if (localStorage.getItem('loggedIn')) {
      this.cardWarning.classList.add('card__warning_hidden');
      this._setEventListener();
    }
  }

  _setEventListener() {
    this._setListeners([[this.cardIcon, 'click', this._saveArticle]]);
  }

  _saveArticle() {
    if (!this._id) {
      this._sendApiAricle();
    }
    this._delApiArticle();
  }

  _sendApiArticle() {
    this.mainApi.createArticle(
      this.keyWord,
      this.article.title,
      this.article.description,
      this.cardDate,
      this.article.sourse.name,
      this.article.url,
      this.article.urlToImage,
    )
      .then((res) => {
        this._id = res.id;
        this.cardIcon.classList.remove('card__icon_unsaved');
        this.cardIcon.classList.add('card__icon_saved');
        console.log(res.id);
      })
      .catch(() => {
        this.cardWarning.textContent = 'Не удалось сохранить. Ошибка сервера';
        this.cardWarning.classList.remove('card__warning_hidden');
        setTimeout(this._changeMessage, 5000);
      });
  }

  _delApiArticle() {
    this.mainApi.deleteArticle(this._id)
      .then(() => {
        this._id = null;
        this.cardIcon.classList.add('card__icon_unsaved');
        this.cardIcon.classList.remove('card__icon_saved');
      })
      .catch(() => {
        this.cardWarning.textContent = 'Не удалось удалить. Ошибка сервера';
        this.cardWarning.classList.remove('card__warning_hidden');
        setTimeout(this._changeMessage, 5000);
      });
  }

  _changeMessage() {
    this.cardWarning.textContent = 'Войдите, чтобы сохранять статьи';
    this.cardWarning.classList.add('card__warning_hidden');
  }
}
