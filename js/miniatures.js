/* eslint-disable no-use-before-define */
import { isEscapeKey } from './utils.js';

const miniaturesTemplateFragment = document.querySelector('#picture').content;
const miniaturesTemplate = miniaturesTemplateFragment.querySelector('.picture');
const miniaturesPictures = document.querySelector('.pictures');
const fullPhotoTemplate = document.querySelector('.big-picture');
const closeFullPic = document.querySelector('.big-picture__cancel');
const commentTemplate = fullPhotoTemplate.querySelector('.social__comment');
const commentsContainer = fullPhotoTemplate.querySelector('.social__comments');
const fullPhotoCommentsCountCurrent = document.querySelector('.comments-count--current');
const fullPhotoCommentsLoader = fullPhotoTemplate.querySelector('.comments-loader');
const fullPhotoCommentsCountBlock = fullPhotoTemplate.querySelector('.social__comment-count');

const SHOWN_COMMENTS_COUNT = 5;

const renderComments = (commentsList) => {
  commentsContainer.innerHTML = '';

  commentsList.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    commentTemplate.querySelector('.social__text').textContent = comment.message;
    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentsContainer.appendChild(newComment);
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
      document.body.classList.add('modal-open');

      let displayedCommentCount = SHOWN_COMMENTS_COUNT;
      const onLoaderCommentClick = () => {
        renderComments(comments.slice(displayedCommentCount, displayedCommentCount + SHOWN_COMMENTS_COUNT));
        fullPhotoCommentsCountCurrent.textContent = commentTemplate.length;
        if (commentTemplate.length === commentsContainer.comments.length) {
          fullPhotoTemplate.querySelector('.comments-loader').classList.add('hidden');
        }
        displayedCommentCount += SHOWN_COMMENTS_COUNT;
      };

      const sliceComments = comments.slice(0, SHOWN_COMMENTS_COUNT);
      sliceComments.forEach(renderComments);
      fullPhotoCommentsCountCurrent.textContent = commentTemplate.length;
      if (comments.length > SHOWN_COMMENTS_COUNT) {
        fullPhotoCommentsLoader.addEventListener('click', onLoaderCommentClick);
        fullPhotoCommentsLoader.classList.remove('hidden');
        fullPhotoCommentsCountBlock.classList.remove('hidden');
      } else if (comments.length === 0) {
        fullPhotoCommentsCountBlock.classList.add('hidden');
        fullPhotoCommentsLoader.classList.add('hidden');
      } else {
        fullPhotoCommentsLoader.classList.add('hidden');
      }
    });
  });

  miniaturesPictures.appendChild(miniaturesFragment);

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
};

export {renderMiniatures};
