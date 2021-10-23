import {isEscapeKey} from './mock/press-escape-button.js';
import { hashtagInput, commentTextarea } from './form-validation.js';

const bodyVisible = document.querySelector('body');
const uploadFileElement = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const imageEditFormClose = imageEditForm.querySelector('#upload-cancel');

const onEditFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditForm();
  }
};

const openEditForm = () => {
  imageEditForm.classList.remove('hidden');
  bodyVisible.classList.add('modal-open');

  document.addEventListener('keydown', onEditFormEscKeydown);
};

const closeEditForm = () => {
  if (document.activeElement !== hashtagInput && document.activeElement !== commentTextarea ) {
    imageEditForm.classList.add('hidden');
    bodyVisible.classList.remove('modal-open');

    document.removeEventListener('keydown', onEditFormEscKeydown);
  }
};

uploadFileElement.addEventListener('change', (evt) => {
  openEditForm();
  evt.target.value = '';
});

imageEditFormClose.addEventListener('click', () => {
  closeEditForm();
});
