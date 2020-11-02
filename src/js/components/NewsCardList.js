import BaseComponent from './BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(container, preloaderElement, buttonElement, errorElement, newsCard) {
    super();
    this._container = container;
    this._preloaderElement = preloaderElement;
    this._buttonElement = buttonElement;
    this._errorElement = errorElement;
    this.newsCard = newsCard;
    this._showMore = this._showMore.bind(this);
  }

  //  Функция направляет данные из массива на создание карточки и последующее добавление на страницу
  renderResults(cardsArray, keyWord) {
    this.cardsArray = cardsArray;
    this.keyWord = keyWord;
    const cardsRender = this.cardsArray.splice(0, 3);
    cardsRender.forEach((card) => {
      const cardElement = this.newsCard.create(card, this.keyWord);
      this._addCard(cardElement);
    });
  }

  // Функция устанавливает слушатель на кнопку показать еще
  setEventListener(cardsArray) {
    if (cardsArray.length > 3) {
      this._buttonElement.classList.remove('search-result__button_hidden');
    } else {
      this._buttonElement.classList.add('search-result__button_hidden');
    }
    this._setListeners([[this._buttonElement, 'click', this._showMore]]);
  }

  // Отрисовка лоудера
  renderLoader(state) {
    if (state) {
      this._preloaderElement.classList.add('search-status_is-opened');
    } else {
      this._preloaderElement.classList.remove('search-status_is-opened');
    }
  }

  // Отрисовка ошибка связи
  renderError(state) {
    if (state) {
      this._errorElement.classList.add('search-status_is-opened');
    } else {
      this.errorElement.classList.remove('search-status_is-opened');
    }
  }

  _showMore() {
    this.renderResults(this.cardsArray, this.keyWord);
    if (this.cardsArray.length === 0) {
      this._buttonElement.classList.add('search-result__button_hidden');
    }
  }

  // Сформированная карточка добавляется в разметку
  _addCard(card) {
    this._container.appendChild(card);
  }

  clearCardList() {
    const cards = Array.from(this._container.querySelectorAll('.card'));
    if (cards.length !== 0) {
      cards.forEach((card) => {
        card.remove();
      });
    }
  }
}
