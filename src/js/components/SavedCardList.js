export default class NewsCardList {
  constructor(container, newsCard) {
    this._container = container;
    this.newsCard = newsCard;
  }

  renderSavedCards(cardsArray) {
    this.cardsArray = cardsArray;
    this.cardsArray.forEach((card) => {
      const cardElement = this.newsCard.create(card);
      this._addCard(cardElement);
    });
  }

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
