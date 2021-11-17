import {getRandomPositiveInteger, debounce} from './utils.js';
import { renderMiniatures } from './miniatures.js';

const RANDOM_PHOTOS_COUNT = 10;
const DELAY_TIME = 500;


const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = document.querySelectorAll('.img-filters__button');

const showRandomPhotos = (picturesArray) => {
  for (let index = picturesArray.length - 1; index > 0; index--) {
    const randomIndex = getRandomPositiveInteger(0, picturesArray.length - 1);
    [picturesArray[index], picturesArray[randomIndex]] = [picturesArray[randomIndex], picturesArray[index]];
  }
  return picturesArray.slice(0,RANDOM_PHOTOS_COUNT);
};

const showDiscussedPhotos = (picturesArray) => {
  picturesArray.sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);
  return picturesArray;
};


const shufflePhotos = (pictures) => {

  let shuffledPicturesArray = [];
  const delayRendering = debounce(renderMiniatures, DELAY_TIME);
  imgFiltersForm.addEventListener('click', (evt) => {
    evt.preventDefault();

    imgFiltersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

    const picturesArray = pictures.slice();

    if (evt.target.matches('#filter-default')) {
      shuffledPicturesArray = pictures;
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-random')) {
      shuffledPicturesArray = showRandomPhotos(picturesArray);
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-discussed')) {
      shuffledPicturesArray = showDiscussedPhotos(picturesArray);
      evt.target.classList.add('img-filters__button--active');
    }
    delayRendering(shuffledPicturesArray);
  });
};

export {shufflePhotos};
