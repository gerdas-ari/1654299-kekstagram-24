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

// const changeZoomHandler = (evt) => {
//   if (evt.target.matches(smallerImgButton) && scaleValue !== SCALE_MIN) {
//     imagePreview.style.transform = `scale(${scaleValue - SCALE_STEP})`;
//     scaleControlValue.value = `${(scaleValue - SCALE_STEP) * 100}%`;
//   }
//   if (evt.target.matches(biggerImgButton) && scaleValue !== SCALE_MAX) {
//     imagePreview.style.transform = `scale(${scaleValue + SCALE_STEP})`;
//     scaleControlValue.value = `${(scaleValue + SCALE_STEP) * 100}%`;
//   }
// };

const clickZoomOut = smallerImgButton.addEventListener('click', zoomOutPhoto);
const clickZoomIn = biggerImgButton.addEventListener('click', zoomInPhoto);

// switch case

// const makeSmallerImg = () => {
//   smallerImgButton.addEventListener('click', () => {
//     if (scaleValue.value === '100%') {
//       imagePreview.style.transform = 'scale(0.75)';
//       scaleValue.value = '75%';
//       scaleValue.textContent = '75%';
//       return;
//     }
//     if (scaleValue.value === '75%') {
//       imagePreview.style.transform = 'scale(0.5)';
//       scaleValue.value = '50%';
//       scaleValue.textContent = '50%';
//       return;
//     }
//     if (scaleValue.value === '50%') {
//       imagePreview.style.transform = 'scale(0.25)';
//       scaleValue.value = '25%';
//       scaleValue.textContent = '25%';
//     }
//   });
// };

// const makeBiggerImg = () => {
//   biggerImgButton.addEventListener('click', () => {
//     if (scaleValue.value === '25%') {
//       imagePreview.style.transform = 'scale(0.5)';
//       scaleValue.value = '50%';
//       scaleValue.textContent = '50%';
//       return;
//     }
//     if (scaleValue.value === '50%') {
//       imagePreview.style.transform = 'scale(0.75)';
//       scaleValue.value = '75%';
//       scaleValue.textContent = '75%';
//       return;
//     }
//     if (scaleValue.value === '75%') {
//       imagePreview.style.transform = 'scale(1)';
//       scaleValue.value = '100%';
//       scaleValue.textContent = '100%';
//     }
//   });
// };

// export {makeSmallerImg};
export {clickZoomOut, clickZoomIn};
