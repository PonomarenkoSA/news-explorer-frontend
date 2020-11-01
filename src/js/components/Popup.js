import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(closeElement, popup) {
    super();
    this._popup = popup;
    this._closeElement = closeElement;
    this._close = this.close.bind(this);
    this._handleClickPopup = this._handleClickPopup.bind(this);
    this._handleKeydownEsc = this._handleKeydownEsc.bind(this);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    this._setListeners([
      [this._closeElement, 'click', this._close],
      [this._popup, 'mousedown', this._handleClickPopup],
      [document, 'keydown', this._handleKeydownEsc],
    ]);
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    this._clearListeners([
      [this._closeElement, 'click', this._close],
      [this._popup, 'mousedown', this._handleClickPopup],
      [document, 'keydown', this._handleKeydownEsc],
    ]);
  }

  _handleClickPopup(event) {
    const { target } = event;
    if (target === this._popup) {
      this._close();
    }
  }

  _handleKeydownEsc(event) {
    const { key } = event;
    if (key === 'Escape') {
      this._close();
    }
  }
}
