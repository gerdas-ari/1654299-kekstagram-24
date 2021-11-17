import {renderMiniatures} from './miniatures.js';
import {checkHashtagValid} from './form-validation.js';
import {initZoom} from './change-scale.js';
import {getServerData} from './api.js';
import {shufflePhotos} from './sorting.js';

checkHashtagValid();
initZoom();

getServerData((data) => {
  renderMiniatures(data);
  shufflePhotos(data);
});
