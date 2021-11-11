/* eslint-disable no-use-before-define */
import { isEscapeKey } from './utils.js';

const miniaturesTemplateFragment = document.querySelector('#picture').content;
const miniaturesTemplate = miniaturesTemplateFragment.querySelector('.picture');
const miniaturesPictures = document.querySelector('.pictures');
const fullPhotoTemplate = document.querySelector('.big-picture');
const closeFullPic = document.querySelector('.big-picture__cancel');
const commentTemplate = fullPhotoTemplate.querySelector('.social__comment');
const commentsContainer = fullPhotoTemplate.querySelector('.social__comments');
const commentLoader = fullPhotoTemplate.querySelector('.comments-loader');
const fullPhotoCommentsCountCurrent = document.querySelector('.comments-count--current');
const fullPhotoCommentsCountAll = fullPhotoTemplate.querySelector('.comments-count');

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';

  commentLoader.addEventListener('click', () => {
    const partComments = comments.splice(0, 5);
    fullPhotoCommentsCountCurrent.textContent = fullPhotoCommentsCountAll.textContent - comments.length;
    if (fullPhotoCommentsCountCurrent.textContent === fullPhotoCommentsCountAll.textContent) {
      commentLoader.classList.add('hidden');
    }

    partComments.forEach((comment) => {
      const newComment = commentTemplate.cloneNode(true);
      commentTemplate.querySelector('.social__text').textContent = comment.message;
      commentTemplate.querySelector('.social__picture').src = comment.avatar;
      commentTemplate.querySelector('.social__picture').alt = comment.name;
      commentsContainer.appendChild(newComment);
    });
  });
};

const renderMiniatures = (miniaturesData) => {
  const miniaturesFragment = document.createDocumentFragment();

  miniaturesData.forEach (({url, likes, comments, description}) => {
    const miniatureElement = miniaturesTemplate.cloneNode(true);
    miniatureElement.querySelector('.picture__img').src = url;
    miniatureElement.querySelector('.picture__comments').textContent = comments.length;
    miniatureElement.querySelector('.picture__likes').textContent = likes;
    miniaturesFragment.appendChild(miniatureElement);

    miniatureElement.addEventListener('click', () => {
      fullPhotoTemplate.classList.remove('hidden');
      fullPhotoTemplate.querySelector('.big-picture__img img').src = url;
      fullPhotoTemplate.querySelector('.likes-count').textContent = likes;
      fullPhotoTemplate.querySelector('.comments-count').textContent = comments.length;
      fullPhotoTemplate.querySelector('.social__caption').textContent = description;
      fullPhotoTemplate.querySelector('.comments-loader').classList.remove('hidden');
      fullPhotoTemplate.querySelector('.social__comment-count').classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onFullPicEscKeydown);
      renderComments(comments);
    });
  });

  miniaturesPictures.appendChild(miniaturesFragment);
};

const onFullPicEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closedFullPic();
  }
};

const closedFullPic = () => {
  document.removeEventListener('keydown', onFullPicEscKeydown);
  fullPhotoTemplate.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

closeFullPic.addEventListener('click', () => {
  closedFullPic();
});

export {renderMiniatures};
