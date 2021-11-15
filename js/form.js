/* eslint-disable no-use-before-define */
import {isEscapeKey, showAlert, FILE_TYPES} from './utils.js';
import {hashtagInput, commentTextarea, onFormSubmit} from './form-validation.js';
import {effectLevelScale} from './change-filter.js';

const form = document.querySelector('.img-upload__form');
const bodyVisible = document.querySelector('body');
const uploadFileElement = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const imageEditFormClose = imageEditForm.querySelector('#upload-cancel');
const photoLoaderModal = document.querySelector('#messages').content.querySelector('.img-upload__message');
const minPhoto = document.querySelectorAll('.effects__preview');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview img');


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
  imageEditFormClose.addEventListener('click', closeEditForm);
  form.addEventListener('submit', onFormSubmit);
  document.addEventListener('keydown', onEditFormEscKeydown);
};

const closeEditForm = () => {
  if (document.activeElement !== hashtagInput && document.activeElement !== commentTextarea ) {
    imageEditForm.classList.add('hidden');
    bodyVisible.classList.remove('modal-open');

    document.removeEventListener('keydown', onEditFormEscKeydown);
    form.removeEventListener('submit', onFormSubmit);
    form.reset();
    imgUploadPreview.style.transform = '';
    imgUploadPreview.style.filter = '';
    imgUploadPreview.className = 'img-upload__preview';
  }
};

const setPreviewImage = (evt) => {
  const userPhoto = evt.target.files[0];
  const userPhotoUrl = URL.createObjectURL(userPhoto);
  const userPhotoName = userPhoto.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => userPhotoName.endsWith(item));
  imgUploadPreviewImg.addEventListener('load', () => {
    photoLoaderModal.remove();
    openEditForm();
  },
  { once: true });

  if (matches) {
    bodyVisible.append(photoLoaderModal);
    imgUploadPreviewImg.src = userPhotoUrl;
    minPhoto.forEach((element) => element.style.backgroundImage = `url(${imgUploadPreviewImg.src})`);
  } else {
    showAlert('Неподдерживаемый формат изображения. Загрузите другое изображение');
  }
};

uploadFileElement.addEventListener('change', setPreviewImage);


export {closeEditForm};
