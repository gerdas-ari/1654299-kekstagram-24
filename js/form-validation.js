import { sendData } from './api.js';
import {onImageEditFormCloseClick} from './form.js';
import { ESCAPE_CODE } from './utils.js';

// const MAX_COMMENT_LENGTH = 140;
const HASHTAG_COUNT = 5;
const HASHTAG_LENGTH = 20;
const hashtagValid = /^#[A-Za-zА-Яа-яЁё0-9]*$|(^$)/;

const hashtagInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');
const successSendBlock = document.querySelector('#success').content.querySelector('.success');
const errorSendBlock = document.querySelector('#error').content.querySelector('.error');
const successButton = successSendBlock.querySelector('.success__button');
const errorButton = errorSendBlock.querySelector('.error__button');
const body = document.querySelector('body');

const checkHashtagValid = () => {
  hashtagInput.addEventListener('input', () => {
    hashtagInput.value = hashtagInput.value.toLowerCase().replace(/\s+/g, ' ');

    const hashtags = hashtagInput.value.split(' ');
    const errors = [];

    const hasDuplicates = () => {
      const counts = [];

      for (let i = 0; i <= hashtags.length; i++) {
        if (counts[hashtags[i]] === undefined) {
          counts[hashtags[i]] = 1;
        } else {
          return true;
        }
      }
      return false;
    };

    hashtags.forEach((tag) => {
      if (!tag.startsWith('#')) {
        errors.push('Хештеги должны начинаться с "#" и отделяться пробелом');
      }
      if (tag === '') {
        errors.length = 0;
      }
      if (tag === '#') {
        errors.push('Хештег не может состоять только из "#');
      }
      if (!hashtagValid.test(tag)) {
        errors.push('Хештеги должны состоять только из букв и чисел');
      }
      if (tag.length > HASHTAG_LENGTH) {
        errors.push(`Хештег не может быть длиннее ${HASHTAG_LENGTH} символов`);
      }
      if (hasDuplicates(hashtags) === true) {
        errors.push('Хештеги не могут повторяться');
      }
      if (hashtags.length > HASHTAG_COUNT && hashtags[HASHTAG_COUNT] !== '') {
        errors.push(`Нельзя добавлять более ${HASHTAG_COUNT} хештегов`);
      }
    });
    if (hashtags[0] === '') {
      hashtagInput.value = hashtagInput.value.trim();
      hashtagInput.setCustomValidity('');
    } else if (errors.length === 0) {
      hashtagInput.setCustomValidity('');
    } else {
      hashtagInput.setCustomValidity(errors[0]);
    }
    hashtagInput.reportValidity();
  });
};

const onErrorMessageShow = (evt) => {
  if (evt.key !== ESCAPE_CODE && evt.target !== errorButton && evt.target.matches('.error__inner')) {
    return;
  }
  errorSendBlock.remove();
  errorButton.removeEventListener('click', onErrorMessageShow);
  document.removeEventListener('keydown', onErrorMessageShow);
};

const onSuccessMessageShow = (evt) => {
  if (evt.key !== ESCAPE_CODE && evt.target !== successButton && evt.target.matches('.success__inner')) {
    return;
  }
  successSendBlock.remove();
  successSendBlock.removeEventListener('click', onSuccessMessageShow);
  document.removeEventListener('keydown', onSuccessMessageShow);
};

const openErrorMessage = () => {
  body.append(errorSendBlock);
  errorButton.addEventListener('click', onErrorMessageShow);
  document.addEventListener('keydown', onErrorMessageShow);
};
const openSuccessMessage = () => {
  body.append(successSendBlock);
  successSendBlock.addEventListener('click', onSuccessMessageShow);
  document.addEventListener('keydown', onSuccessMessageShow);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  commentTextarea.value = commentTextarea.value.replace(/\s+/g, ' ').trim();
  hashtagInput.value = hashtagInput.value.replace(/\s+/g, ' ').trim();
  sendData(openSuccessMessage, openErrorMessage, new FormData(evt.target), onImageEditFormCloseClick);
};

export {hashtagInput, commentTextarea, checkHashtagValid, onFormSubmit};
