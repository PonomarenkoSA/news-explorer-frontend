import BaseComponent from './BaseComponent';

export default class SearchForm extends BaseComponent {
  constructor(input, searchErrorMessage, placeholderText) {
    super();
    this.input = input;
    this.searchErrorMessage = searchErrorMessage;
    this.placeholderText = placeholderText;
  }

  validateInputElement() {
    if (!this.input.checkValidity()) {
      this.input.value = '';
      this.input.placeholder = this.searchErrorMessage;
      return false;
    }
    this.input.placeholder = this.placeholderText;
    return true;
  }

  getInfo() {
    return this.input.value;
  }
}
