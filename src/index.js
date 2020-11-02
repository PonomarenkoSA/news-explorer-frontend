/* eslint-disable no-use-before-define */

import './css/style.css';

import Popup from './js/components/Popup';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Header from './js/components/Header';
import StartPage from './js/components/StartPage';
import Form from './js/components/Form';
import SearchForm from './js/components/SearchForm';
import NewsCard from './js/components/NewsCard';
import {
  NUMBER_PREVIOUS_DAYS,
  NEWS_API_PARAMS,
  MAIN_API_PARAMS,
  MAIN_PAGE_PATH,
  FORM_ERROR_MESSAGES,
  SEARCH_ERROR_MESSAGE,
  PLACEHOLDER_TEXT,
} from './js/constants/constant';
import getPreviousDate from './js/utils/utility-previous-date';
import getCardDate from './js/utils/utility-card-date';
import NewsCardList from './js/components/NewsCardList';

// Создаем переменные для эдементов DOM

const headerSigninButton = document.querySelector('.header__button_auth');
const headerLogoutButton = document.querySelector('.header__button_name');
const headerLinkSaved = document.querySelector('.header__item_saved');
const formSingupLink = document.querySelector('.popup__link_signin');
const formSinginLink = document.querySelector('.popup__link_signup');
const formSingupButton = document.querySelector('.popup__button_signup');
const formSinginButton = document.querySelector('.popup__button_signin');
const successSinginLink = document.querySelector('.popup__link_success');
const signinPopupElement = document.querySelector('.popup_signin');
const closeElementSignin = signinPopupElement.querySelector('.popup__close');
const signupPopupElement = document.querySelector('.popup_signup');
const closeElementSignup = signupPopupElement.querySelector('.popup__close');
const successPopupElement = document.querySelector('.popup_success');
const closeElementSuccess = successPopupElement.querySelector('.popup__close');
const formSignup = document.querySelector('form[name=signup]');
const formSingin = document.querySelector('form[name=signin]');
const formSearch = document.querySelector('form[name=search]');
const searchInputElement = document.querySelector('.search__input');
const searchArticlesButton = document.querySelector('.search__button');
const searchPreloader = document.querySelector('.search-status.search-status_preloader');
const searchNotFind = document.querySelector('.search-status.search-status_not-found');
const searchErrorNetwork = document.querySelector('.search-status.search-status_error');
const searchArticlesBlock = document.querySelector('.search-result');
const cardsContainer = document.querySelector('.cards-container');
const searchResultButton = document.querySelector('.search-result__button');
const menuPopupElement = document.querySelector('.popup_menu-mobile');
const closeElementMobile = menuPopupElement.querySelector('.popup__close-mobile');
const mobileButton = document.querySelector('.header__button-mobile');
const mobileSigninButton = document.querySelector('.popup__button-mobile_auth');
const mobileLogoutButton = document.querySelector('.popup__button-mobile_name');
const mobileSavedLink = document.querySelector('.popup__item-mobile_saved');

// Создаем экземпляры классов

const menuPopup = new Popup(closeElementMobile, menuPopupElement);
const signinPopup = new Popup(closeElementSignin, signinPopupElement);
const signupPopup = new Popup(closeElementSignup, signupPopupElement);
const successPopup = new Popup(closeElementSuccess, successPopupElement);
const mainApi = new MainApi(MAIN_API_PARAMS);
const searchForm = new SearchForm(searchInputElement, SEARCH_ERROR_MESSAGE, PLACEHOLDER_TEXT);
const newsApi = new NewsApi(NEWS_API_PARAMS);
const header = new Header(
  headerLogoutButton,
  headerLinkSaved,
  headerSigninButton,
  mobileLogoutButton,
  mobileSavedLink,
  mobileSigninButton,
);
const signinForm = new Form(
  formSingin,
  FORM_ERROR_MESSAGES,
  mainApi,
  signinPopup,
  formSinginButton,
  '',
);
const signupForm = new Form(
  formSignup,
  FORM_ERROR_MESSAGES,
  mainApi,
  signupPopup,
  formSingupButton,
  successPopup,
);
const startPage = new StartPage(MAIN_PAGE_PATH);
const newsCard = new NewsCard(mainApi, getCardDate);
const newsCardList = new NewsCardList(
  cardsContainer,
  searchPreloader,
  searchResultButton,
  searchErrorNetwork,
  newsCard,
);

// Объявляем функции

// Функция обработчик для открытия формы Signin при нажатии кнопки "Авторизоваться" в шапке
function openFormSignin() {
  signinForm.setEventListeners();
  signinPopup.open();
}

// Функция обработчик открытия мобильного меню
function openMenuPopup() {
  menuPopup.open();
}

// Функция обработчик поисковой строки.
// Получает данные с newsAPI и передает их на обработку классу newsCardList
function setSearchResult(event) {
  event.preventDefault();
  if (searchForm.validateInputElement()) {
    const keyWord = searchForm.getInfo();
    searchNotFind.classList.remove('search-status_is-opened');
    searchErrorNetwork.classList.remove('search-status_is-opened');
    searchArticlesBlock.classList.remove('search-result_is-opened');
    newsCardList.clearCardList();
    newsCardList.renderLoader(true);
    const { dateFrom, dateTo } = getPreviousDate(NUMBER_PREVIOUS_DAYS);
    newsApi.getNews(keyWord, dateFrom, dateTo)
      .then((data) => {
        if (data.articles.length !== 0) {
          newsCardList.setEventListener(data.articles);
          newsCardList.renderResults(data.articles, keyWord);
          searchArticlesBlock.classList.add('search-result_is-opened');
        } else {
          searchNotFind.classList.add('search-status_is-opened');
        }
      })
      .catch(() => {
        newsCardList.renderError(true);
      })
      .finally(() => {
        newsCardList.renderLoader(false);
      });
    formSearch.reset();
  }
}

// Функция переключает видимость форм

function switchForm(event) {
  if (event.target === formSingupLink) {
    signinPopup.close();
    signupForm.setEventListeners();
    signupPopup.open();
  }
  if (event.target === formSinginLink) {
    signupPopup.close();
    signinForm.setEventListeners();
    signinPopup.open();
  }
  if (event.target === successSinginLink) {
    successPopup.close();
    signinForm.setEventListeners();
    signinPopup.open();
  }
}

// Функция для первоначальной отрисовки страницы.
// Отправляет запрос на mainApi для проверки залогинен ли пользователь

function setHeaderRender() {
  mainApi.getUserData()
    .then((res) => {
      header.render(true, res.name);
      localStorage.setItem('loggedIn', 'true');
    })
    .catch(() => {
      header.render(false, '');
      localStorage.setItem('loggedIn', 'false');
    });
}

// Функция обрабатывает событие выхода из личного кабинета.
//  В зависимости от активной страницы либо направляет пользователя на стртовую,
// либо перезагружает текущую.
function logout() {
  mainApi.logout()
    .then(() => {
      localStorage.setItem('loggedIn', 'false');
      startPage.replacePage();
    })
    .catch((err) => console.log(err));
}

// Устанавливаем слушатели событий

headerSigninButton.addEventListener('click', openFormSignin);
formSingupLink.addEventListener('click', switchForm);
formSinginLink.addEventListener('click', switchForm);
successSinginLink.addEventListener('click', switchForm);
headerLogoutButton.addEventListener('click', logout);
searchArticlesButton.addEventListener('click', setSearchResult);

mobileButton.addEventListener('click', openMenuPopup);
mobileSigninButton.addEventListener('click', openFormSignin);
mobileLogoutButton.addEventListener('click', logout);

setHeaderRender();
