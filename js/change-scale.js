const SCALE_STEP = 0.25;
const SCALE_MIN = 0.25;
const SCALE_MAX = 1;

const smallerImgButton = document.querySelector('.scale__control--smaller');
const biggerImgButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');

const onSmallerImgButtonClick = () => {
  const scaleValue = scaleControlValue.value.replace(/[^0-9]/g, '') / 100;
  if (scaleValue !== SCALE_MIN) {
    imagePreview.style.transform = `scale(${scaleValue - SCALE_STEP})`;
    scaleControlValue.value = `${(scaleValue - SCALE_STEP) * 100}%`;
  }
};

const onBiggerImgButtonClick = () => {
  const scaleValue = scaleControlValue.value.replace(/[^0-9]/g, '') / 100;
  if (scaleValue !== SCALE_MAX) {
    imagePreview.style.transform = `scale(${scaleValue + SCALE_STEP})`;
    scaleControlValue.value = `${(scaleValue + SCALE_STEP) * 100}%`;
  }
};

const initZoom = () => {
  smallerImgButton.addEventListener('click', onSmallerImgButtonClick);
  biggerImgButton.addEventListener('click', onBiggerImgButtonClick);
};

export {initZoom};
