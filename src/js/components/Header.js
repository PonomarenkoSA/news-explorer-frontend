export default class Header {
  constructor(logoutButton,
    savedArticlesLink,
    headerSigninButton,
    mobileLogoutButton,
    mobileSavedLink,
    mobileSigninButton) {
    this.logoutButton = logoutButton;
    this.savedArticlesLink = savedArticlesLink;
    this.headerSigninButton = headerSigninButton;
    this.mobileLogoutButton = mobileLogoutButton;
    this.mobileSavedLink = mobileSavedLink;
    this.mobileSigninButton = mobileSigninButton;
  }

  // В зависимости от статуса авторизации устанавлмвается соответствующий heder,
  //  в том числе мобильный
  render(isLoggedIn, userName) {
    this.logoutName = this.logoutButton.querySelector('.button__user');
    this.logoutMobileName = this.mobileLogoutButton.querySelector('.popup__user-mobile');
    if (isLoggedIn) {
      this.logoutButton.classList.remove('header__button_hidden');
      this.logoutName.textContent = userName;
      this.savedArticlesLink.classList.remove('header__item_hidden');
      this.headerSigninButton.classList.add('header__button_hidden');

      this.mobileLogoutButton.classList.remove('popup__button-mobile_hidden');
      this.logoutMobileName.textContent = userName;
      this.mobileSavedLink.classList.remove('popup__item-mobile_hidden');
      this.mobileSigninButton.classList.add('popup__button-mobile_hidden');
    } else {
      this.logoutButton.classList.add('header__button_hidden');
      this.logoutName.textContent = '';
      this.savedArticlesLink.classList.add('header__item_hidden');
      this.headerSigninButton.classList.remove('header__button_hidden');

      this.mobileLogoutButton.classList.add('popup__button-mobile_hidden');
      this.logoutMobileName.textContent = '';
      this.mobileSavedLink.classList.add('popup__item-mobile_hidden');
      this.mobileSigninButton.classList.remove('popup__button-mobile_hidden');
    }
  }
}
