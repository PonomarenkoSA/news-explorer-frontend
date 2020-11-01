const NUMBER_PREVIOUS_DAYS = 7;

const NEWS_API_PARAMS = {
  baseUrl: 'https://newsapi.org/v2/everything?',
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

const MAIN_PAGE_PATH = '/';

const SEARCH_ERROR_MESSAGE = 'Необходимо ввести ключевое слово';
const PLACEHOLDER_TEXT = 'Введите тему новости';

const ARTICLES = {
  articles: [
    {
      description: 'За последнее время накопилось немного фотографий из-под крыла самолета. Кстати, несмотря ни на что, мир потихоньку оживает.',
      publishedAt: '2020-10-31T10:03:35Z',
      source: { id: null, name: 'Varlamov.ru' },
      title: 'Посмотри, как прекрасен мир, когда летишь в самолёте!',
      url: 'https://varlamov.ru/4075714.html',
      urlToImage: 'https://varlamov.me/2020/fly2/00s.jpg',
    },
  ],
};

export {
  NUMBER_PREVIOUS_DAYS,
  NEWS_API_PARAMS,
  MAIN_API_PARAMS,
  FORM_ERROR_MESSAGES,
  MAIN_PAGE_PATH,
  SEARCH_ERROR_MESSAGE,
  PLACEHOLDER_TEXT,
  ARTICLES,
};
