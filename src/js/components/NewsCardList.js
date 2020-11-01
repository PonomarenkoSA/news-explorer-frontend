import BaseComponent from './BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(container, preloaderElement, buttonElement, errorElement) {
    super();
    this._container = container;
    this._preloaderElement = preloaderElement;
    this._buttonElement = buttonElement;
    this._errorElement = errorElement;
  }

  renderResults(cardsArray) {
    this.cardsArray = cardsArray;
    const cardsRender = this.cardsArray.splice(0, 3);
    cardsRender.forEach((card) => {
      this._addCard(card);
      this._setHandlers(this.showMoreButton, this._showMore);
    });
  }

  renderLoader(state) {
    if (state) {
      this._preloaderElement.classList.add('search-status_is-opened');
    } else {
      this._preloaderElement.classList.remove('search-status_is-opened');
    }
  }

  renderError(state) {
    if (state) {
      this._errorElement.classList.add('search-status_is-opened');
    } else {
      this.errorElement.classList.remove('search-status_is-opened');
    }
  }

  _showMore() {
    const cardsRender = this.cardsArray.splice(0, 3);
    this.renderResults(cardsRender);
    if (this.cardsArray.length === 0) {
      this._buttonElement.classList.add('.search-result__button_hidden');
    }
  }

  _addCard(card) {
    this.container.appendChild(card);
  }

  clearCardList() {
    const cards = this._container.querySelectorAll('.card');
    if (cards) {
      if (cards.length !== 0) {
        cards.forEach((card) => {
          card.remove();
        });
      }
    }
  }
}
