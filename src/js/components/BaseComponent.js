/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */

export default class BaseComponent {
  constructor() {
  }

  _addListener(element, event, callback) {
    element.addEventListener(event, callback);
  }

  _setListeners(listeners) {
    listeners.forEach((listener) => {
      this._addListener(...listener);
    });
  }

  _clearListeners(listeners) {
    listeners.forEach((listener) => {
      const [element, event, callback] = listener;
      element.removeEventListener(event, callback);
    });
  }
}
