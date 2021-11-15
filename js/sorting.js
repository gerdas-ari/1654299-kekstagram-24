import {getRandomPositiveInteger, debounce} from './utils.js';
import { renderMiniatures } from './miniatures.js';

const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = document.querySelectorAll('.img-filters__button');
const RANDOM_PHOTOS_COUNT = 10;
const DELAY_TIME = 500;

const showRandomPhotos = (copyArray) => {
  for (let index = copyArray.length - 1; index > 0; index--) {
    const randomIndex = getRandomPositiveInteger(0, copyArray.length - 1);
    [copyArray[index], copyArray[randomIndex]] = [copyArray[randomIndex], copyArray[index]];
  }
  return copyArray.slice(0,RANDOM_PHOTOS_COUNT);
};

const showDiscussedPhotos = (copyArray) => {
  copyArray.sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);
  return copyArray;
};


const shufflePhotos = (array) => {

  let shuffleArray = [];
  const delayRendering = debounce(renderMiniatures, DELAY_TIME);
  imgFiltersForm.addEventListener('click', (evt) => {
    evt.preventDefault();

    imgFiltersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

    const copyArray = array.slice();

    if (evt.target.matches('#filter-default')) {
      shuffleArray = array;
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-random')) {
      shuffleArray = showRandomPhotos(copyArray);
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-discussed')) {
      shuffleArray = showDiscussedPhotos(copyArray);
      evt.target.classList.add('img-filters__button--active');
    }
    delayRendering(shuffleArray);
  });
};

export {shufflePhotos};