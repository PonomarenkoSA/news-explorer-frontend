import '../css/articles.css';

import Header from '../js/components/Header';
import Popup from '../js/components/Popup';
import MainApi from '../js/api/MainApi';
import StartPage from '../js/components/StartPage';
import SavedCard from '../js/components/SavedCard';
import SavedCardList from '../js/components/SavedCardList';
import getQuantityArticles from '../js/utils/utility-quantity-articles';
import getSortArticles from '../js/utils/utility-sort-articles';

import {
  MAIN_API_PARAMS,
  MAIN_PAGE_PATH,
} from '../js/constants/constant';
import PersonalAccountTitle from '../js/components/PersonalAccountTitle';

// Записываем в переменные нужные элементы dom
const cardsContainer = document.querySelector('.cards-container');
const headerLogoutButton = document.querySelector('.header__button_name');
const keywordsContainer = document.querySelector('.stat__span');
const titleContainer = document.querySelector('.stat__title');
const headerLinkSaved = document.querySelector('.header__item_saved');
const headerSigninButton = document.querySelector('.header__button_auth');
const menuPopupElement = document.querySelector('.popup_menu-mobile');
const closeElementMobile = menuPopupElement.querySelector('.popup__close-mobile');
const mobileButton = document.querySelector('.header__button-mobile');
const mobileSigninButton = document.querySelector('.popup__button-mobile_auth');
const mobileLogoutButton = document.querySelector('.popup__button-mobile_name');
const mobileSavedLink = document.querySelector('.popup__item-mobile_saved');

// Создание экземпляров классов

const menuPopup = new Popup(closeElementMobile, menuPopupElement);
const mainApi = new MainApi(MAIN_API_PARAMS);
const startPage = new StartPage(MAIN_PAGE_PATH);
const savedCard = new SavedCard(mainApi);
const savedCardList = new SavedCardList(cardsContainer, savedCard);
const header = new Header(
  headerLogoutButton,
  headerLinkSaved,
  headerSigninButton,
  mobileLogoutButton,
  mobileSavedLink,
  mobileSigninButton,
);
const personalAccountTitle = new PersonalAccountTitle(keywordsContainer, titleContainer);

// Вызов методов для начальной отрисовки страницы с
// карточками и перехода на стартовую при отсутствии авторизации
function setStartRender() {
  mainApi.getUserData()
    .then((res) => {
      const { name } = res;
      header.render(true, name);
      localStorage.setItem('loggedIn', 'true');
      mainApi.getArticles()
        .then((data) => {
          savedCardList.renderSavedCards(data.data);
          const title = getQuantityArticles(name, data.data.length);
          personalAccountTitle.setSavedArticlesTitle(title);
          const wordsArray = getSortArticles(data.data);
          personalAccountTitle.setSortedKeywords(wordsArray);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(() => {
      localStorage.setItem('loggedIn', 'false');
      startPage.replacePage();
    });
}

// Функция открывает мобильное меню
function openMenuPopup() {
  menuPopup.open();
}

// Функция обрабатывает событие выхода из личного кабинета
function logout() {
  mainApi.logout()
    .then(() => {
      localStorage.setItem('loggedIn', 'false');
      startPage.replacePage();
    })
    .catch((err) => console.log(err));
}

// Обработчики событий
headerLogoutButton.addEventListener('click', logout);
mobileButton.addEventListener('click', openMenuPopup);
mobileLogoutButton.addEventListener('click', logout);

// ОВызов стартового обработчика
setStartRender();
