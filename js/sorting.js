import {getRandomPositiveInteger, debounce} from './utils.js';
import { renderMiniatures } from './miniatures.js';

const RANDOM_PHOTOS_COUNT = 10;
const DELAY_TIME = 500;


const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = document.querySelectorAll('.img-filters__button');

const showRandomPhotos = (miniatures) => {
  for (let index = miniatures.length - 1; index > 0; index--) {
    const randomIndex = getRandomPositiveInteger(0, miniatures.length - 1);
    [miniatures[index], miniatures[randomIndex]] = [miniatures[randomIndex], miniatures[index]];
  }
  return miniatures.slice(0,RANDOM_PHOTOS_COUNT);
};

const showDiscussedPhotos = (miniatures) => {
  miniatures.sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);
  return miniatures;
};


const shufflePhotos = (pictures) => {

  let shuffledMiniatures = [];
  const delayRendering = debounce(renderMiniatures, DELAY_TIME);
  imgFiltersForm.addEventListener('click', (evt) => {
    evt.preventDefault();

    imgFiltersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

    const miniatures = pictures.slice();

    if (evt.target.matches('#filter-default')) {
      shuffledMiniatures = pictures;
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-random')) {
      shuffledMiniatures = showRandomPhotos(miniatures);
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-discussed')) {
      shuffledMiniatures = showDiscussedPhotos(miniatures);
      evt.target.classList.add('img-filters__button--active');
    }
    delayRendering(shuffledMiniatures);
  });
};

export {shufflePhotos};
