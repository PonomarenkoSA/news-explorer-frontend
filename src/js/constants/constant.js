const NUMBER_PREVIOUS_DAYS = 7;

const NEWS_API_PARAMS = {
  baseUrl: 'https://nomoreparties.co/news/v2/everything?',
  apiKey: '1fdcf7ffb2e643e6a5f47f7e8deb3ebc',
  language: 'ru',
  sortBy: 'popularity',
  pageSize: 100,
};

const MAIN_API_PARAMS = {
  baseUrl: 'https://api.izoore.ru',
  headers: { 'Content-Type': 'application/json' },
};

const FORM_ERROR_MESSAGES = {
  email: {
    valueMissing: 'Это обязательное поле',
    patternMismatch: 'Неправильный формат email',
  },
  password: {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Пароль должен быть не меньше 8 символов',
  },
  name: {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Имя должно быть от 2 до 30 символов',
    tooLong: 'Имя должно быть от 2 до 30 символов',
    patternMismatch: 'Имя должно содержать буквы',
  },
};

const MAIN_PAGE_PATH = '/news-explorer-frontend/';

const SEARCH_ERROR_MESSAGE = 'Необходимо ввести ключевое слово';
const PLACEHOLDER_TEXT = 'Введите тему новости';

export {
  NUMBER_PREVIOUS_DAYS,
  NEWS_API_PARAMS,
  MAIN_API_PARAMS,
  FORM_ERROR_MESSAGES,
  MAIN_PAGE_PATH,
  SEARCH_ERROR_MESSAGE,
  PLACEHOLDER_TEXT,
};
