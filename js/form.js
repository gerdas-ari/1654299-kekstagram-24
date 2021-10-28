import {isEscapeKey} from './mock/press-escape-button.js';
import {hashtagInput, commentTextarea} from './form-validation.js';
import {effectLevelScale, imgPreview} from './change-filter.js';

const form = document.querySelector('.img-upload__form');
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
  effectLevelScale.style.display = 'none';

  document.addEventListener('keydown', onEditFormEscKeydown);
};

const closeEditForm = () => {
  if (document.activeElement !== hashtagInput && document.activeElement !== commentTextarea ) {
    imageEditForm.classList.add('hidden');
    bodyVisible.classList.remove('modal-open');

    document.removeEventListener('keydown', onEditFormEscKeydown);
    form.reset();
    imgPreview.style.transform = '';
    imgPreview.style.filter = '';
    imgPreview.className = '';
  }
};

uploadFileElement.addEventListener('change', (evt) => {
  openEditForm();
  evt.target.value = '';
});

imageEditFormClose.addEventListener('click', () => {
  closeEditForm();
});
