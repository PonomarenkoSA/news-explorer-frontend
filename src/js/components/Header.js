export default class Header {
  constructor(logoutButton, savedArticlesLink, headerSigninButton) {
    this.logoutButton = logoutButton;
    this.savedArticlesLink = savedArticlesLink;
    this.headerSigninButton = headerSigninButton;
  }

  render(isLoggedIn, userName) {
    this.logoutName = this.logoutButton.querySelector('.button__user');
    if (isLoggedIn) {
      this.logoutButton.classList.remove('header__button_hidden');
      this.logoutName.textContent = userName;
      this.savedArticlesLink.classList.remove('header__item_hidden');
      this.headerSigninButton.classList.add('header__button_hidden');
    } else {
      this.logoutButton.classList.add('header__button_hidden');
      this.textContent = '';
      this.savedArticlesLink.classList.add('header__item_hidden');
      this.headerSigninButton.classList.remove('header__button_hidden');
    }
  }
}
