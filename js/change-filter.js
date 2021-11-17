const effectsButtons = document.querySelector('.effects');
const imgPreview = document.querySelector('.img-upload__preview');
const effectLevelScale = document.querySelector('.effect-level');
const rangeSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');

noUiSlider.create(rangeSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const changeSlider = () => {
  effectsButtons.addEventListener('change', (evt) => {
    imgPreview.className = '';
    imgPreview.classList.add('img-upload__preview');
    imgPreview.style.filter = '';
    effectLevelScale.style.display = (evt.target.matches('#effect-none')) ? 'none' : '';

    if (evt.target.matches('#effect-chrome')) {
      imgPreview.classList.add('effects__preview--chrome');
      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }
    if (evt.target.matches('#effect-sepia')) {
      imgPreview.classList.add('effects__preview--sepia');
      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }
    if (evt.target.matches('#effect-marvin')) {
      imgPreview.classList.add('effects__preview--marvin');
      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    }
    if (evt.target.matches('#effect-phobos')) {
      imgPreview.classList.add('effects__preview--phobos');
      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
    if (evt.target.matches('#effect-heat')) {
      imgPreview.classList.add('effects__preview--heat');
      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
  });};

rangeSlider.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle];
  if (imgPreview.classList.contains('effects__preview--chrome')) {
    imgPreview.style.filter = `grayscale(${values[handle]})`;
  }
  if (imgPreview.classList.contains('effects__preview--sepia')) {
    imgPreview.style.filter = `sepia(${values[handle]})`;
  }
  if (imgPreview.classList.contains('effects__preview--marvin')) {
    imgPreview.style.filter = `invert(${values[handle]}%)`;
  }
  if (imgPreview.classList.contains('effects__preview--phobos')) {
    imgPreview.style.filter = `blur(${values[handle]}px)`;
  }
  if (imgPreview.classList.contains('effects__preview--heat')) {
    imgPreview.style.filter = `brightness(${values[handle]})`;
  }
});

changeSlider();
export {effectLevelScale, imgPreview};
