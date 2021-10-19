import {isEscapeKey} from './mock/press-escape-button.js';

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

function openEditForm () {
  imageEditForm.classList.remove('hidden');
  bodyVisible.classList.add('modal-open');

  document.addEventListener('keydown', onEditFormEscKeydown);
}

function closeEditForm () {
  imageEditForm.classList.add('hidden');
  bodyVisible.classList.remove('modal-open');

  document.removeEventListener('keydown', onEditFormEscKeydown);
}

uploadFileElement.addEventListener('change', () => {
  openEditForm();
});

imageEditFormClose.addEventListener('click', () => {
  closeEditForm();
});
