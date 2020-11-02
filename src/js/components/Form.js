import BaseComponent from './BaseComponent';

export default class Form extends BaseComponent {
  constructor(form, formErrorMessages, mainApi, popup, button, successPopup) {
    super();
    this.form = form;
    this.formErrorMessages = formErrorMessages;
    this.mainApi = mainApi;
    this.popup = popup;
    this.button = button;
    this.successPopup = successPopup;
    this._validateInputElement = this._validateInputElement.bind(this);
    this._submitCallback = this._submitCallback.bind(this);
  }

  setEventListeners() {
    this._clear();
    this._delErrorMessage();
    this.button.setAttribute('disabled', '');
    this.inputs = this.form.querySelectorAll('.popup__input');
    this.inputs.forEach((input) => {
      this._setListeners([[input, 'input', this._validateInputElement]]);
    });
    this._setListeners([[this.button, 'click', this._submitCallback]]);
  }

  // Отображает ошибку сервера над кнопкой отправки формы
  _setServerError(message) {
    this.errorButton.textContent = message;
    this.errorButton.classList.add('popup__error_is-opened');
  }

  _validateInputElement(event) {
    this._setServerError('');
    const input = event.target;
    if (!event.target.checkValidity()) {
      const validityList = input.validity;
      const imputName = event.target.getAttribute('name');
      const errorArray = Object.keys(this.formErrorMessages[imputName]);
      errorArray.forEach((item) => {
        if (validityList[item] === true) {
          input.nextElementSibling.textContent = this.formErrorMessages[imputName][item];
        }
      });
      input.nextElementSibling.classList.add('popup__error_is-opened');
    } else {
      input.nextElementSibling.classList.remove('popup__error_is-opened');
    }
    this._validateForm();
  }

  _delErrorMessage() {
    const errorElements = this.form.querySelectorAll('span');
    errorElements.forEach((span) => {
      span.classList.remove('popup__error_is-opened');
    });
    this.errorButton = this.form.querySelector('.popup__error_button');
    this.errorButton.textContent = '';
    this.errorButton.classList.remove('popup__error_is-opened');
  }

  // Валидируется вся форма
  _validateForm() {
    let flag = true;
    this.inputs.forEach((input) => {
      if (!input.checkValidity()) {
        flag = false;
      }
    });
    if (!flag) {
      this.button.classList.remove('popup__button_active');
      this.button.setAttribute('disabled', '');
    } else {
      this.button.classList.add('popup__button_active');
      this.button.removeAttribute('disabled');
    }
  }

  _clear() {
    this.form.reset();
  }

  // Получение данных формы
  _getInfo() {
    const formValues = {};
    this.inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _submitCallback(event) {
    event.preventDefault();
    const formValues = this._getInfo();
    if (this.form.name === 'signin') {
      this.mainApi.signin(formValues)
        .then(() => {
          localStorage.setItem('loggedIn', 'true');
          this.popup.close();
          window.location.reload();
        })
        .catch((err) => {
          this._handleApiError(err);
        });
    } else {
      this.mainApi.signup(formValues)
        .then(() => {
          this.popup.close();
          this.successPopup.open();
        })
        .catch((err) => {
          this._handleApiError(err);
        });
    }
  }

  _handleApiError(err) {
    if (err.message === 'Failed to fetch') {
      this._setServerError('Проблемы с сетью');
    } else {
      err.json()
        .then((res) => {
          console.log(res.error);
          this._setServerError(res.error);
        })
        .catch(() => {
          this._setServerError('Попытайтесь позже');
        });
    }
  }
}
