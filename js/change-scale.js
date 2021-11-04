const smallerImgButton = document.querySelector('.scale__control--smaller');
const biggerImgButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const SCALE_STEP = 0.25;
const SCALE_MIN = 0.25;
const SCALE_MAX = 1;

const zoomOutPhoto = () => {
  const scaleValue = scaleControlValue.value.replace(/[^0-9]/g, '') / 100;
  if (scaleValue !== SCALE_MIN) {
    imagePreview.style.transform = `scale(${scaleValue - SCALE_STEP})`;
    scaleControlValue.value = `${(scaleValue - SCALE_STEP) * 100}%`;
  }
};

const zoomInPhoto = () => {
  const scaleValue = scaleControlValue.value.replace(/[^0-9]/g, '') / 100;
  if (scaleValue !== SCALE_MAX) {
    imagePreview.style.transform = `scale(${scaleValue + SCALE_STEP})`;
    scaleControlValue.value = `${(scaleValue + SCALE_STEP) * 100}%`;
  }
};

const initZoom = () => {
  smallerImgButton.addEventListener('click', zoomOutPhoto);
  biggerImgButton.addEventListener('click', zoomInPhoto);
};

export {initZoom};
