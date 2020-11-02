export default class PersonalAccountTitle {
  constructor(keywordsContainer, titleContainer) {
    this.keywordsContainer = keywordsContainer;
    this.titleContainer = titleContainer;
  }

  // Функция отвечает за отображение ключевых слов сохраненных статей
  setSortedKeywords(array) {
    if (array.length === 0) {
      this.keywordsContainer.textContent = 'Ищите и сохраняйте статьи, чтобы увидеть их в своём личном кабинете';
    } else if (array.length <= 3 && array.length > 0) {
      this.keywordsContainer.textContent = `${array.join(', ')}`;
    } else if (array.length > 3) {
      this.keywordsContainer.textContent = `${array.splice(0, 2).join(', ')} и ${array.length} ${array.length % 10 === 1 ? 'другое' : 'другим'}`;
    }
  }

  // Функция устанавливает переданный ей заголовок 2ой страницы
  setSavedArticlesTitle(title) {
    this.titleContainer.textContent = title;
  }
}
