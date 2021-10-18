const miniaturesTemplateFragment = document.querySelector('#picture').content;
const miniaturesTemplate = miniaturesTemplateFragment.querySelector('.picture');
const miniaturesPictures = document.querySelector('.pictures');

const renderMiniatures = (miniaturesData) => {
  const miniaturesFragment = document.createDocumentFragment();

  miniaturesData.forEach (({url, likes, comments}) => {
    const miniatureElement = miniaturesTemplate.cloneNode(true);
    miniatureElement.querySelector('.picture__img').src = url;
    miniatureElement.querySelector('.picture__comments').textContent = comments.length;
    miniatureElement.querySelector('.picture__likes').textContent = likes;
    miniaturesFragment.appendChild(miniatureElement);
  });
  miniaturesPictures.appendChild(miniaturesFragment);
};

export {renderMiniatures};

