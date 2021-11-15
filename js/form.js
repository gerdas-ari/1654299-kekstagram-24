/* eslint-disable no-use-before-define */
import {isEscapeKey, showAlert, FILE_TYPES} from './utils.js';
import {hashtagInput, commentTextarea} from './form-validation.js';
import {effectLevelScale} from './change-filter.js';
import {sendData} from './api.js';

const form = document.querySelector('.img-upload__form');
const bodyVisible = document.querySelector('body');
const uploadFileElement = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const imageEditFormClose = imageEditForm.querySelector('#upload-cancel');
const photoLoaderModal = document.querySelector('#messages').content.querySelector('.img-upload__message');
const minPhoto = document.querySelectorAll('.effects__preview');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

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
  // form.addEventListener('submit', onFormSubmit);
  document.addEventListener('keydown', onEditFormEscKeydown);
};

const closeEditForm = () => {
  if (document.activeElement !== hashtagInput && document.activeElement !== commentTextarea ) {
    imageEditForm.classList.add('hidden');
    bodyVisible.classList.remove('modal-open');

    document.removeEventListener('keydown', onEditFormEscKeydown);
    // form.removeEventListener('submit', onFormSubmit);
    form.reset();
    imgUploadPreview.style.transform = '';
    imgUploadPreview.style.filter = '';
    imgUploadPreview.className = '';
  }
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};

const setPreviewImage = (evt) => {
  const userPhoto = evt.target.files[0];
  const userPhotoUrl = URL.createObjectURL(userPhoto);
  const userPhotoName = userPhoto.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => userPhotoName.endsWith(item));
  imgUploadPreview.addEventListener('load', () => {
    photoLoaderModal.remove();
    openEditForm(),
    { once: true };
  });
  if (matches) {
    bodyVisible.append(photoLoaderModal);
    imgUploadPreview.src = userPhotoUrl;
    minPhoto.forEach((element) => element.style.backgroundImage = `url(${imgUploadPreview.src})`);
  } else {
    showAlert('Неподдерживаемый формат изображения. Загрузите другое изображение');
  }
};

uploadFileElement.addEventListener('change', setPreviewImage);


export {setUserFormSubmit};
