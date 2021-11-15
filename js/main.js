import {renderMiniatures} from './miniatures.js';
import './form.js';
import {checkCommentValid, checkHashtagValid} from './form-validation.js';
import {initZoom} from './change-scale.js';
import { getServerData } from './api.js';
import {shufflePhotos} from './sorting.js';

checkCommentValid();
checkHashtagValid();
initZoom();

getServerData((data) => {
  renderMiniatures(data);
  shufflePhotos(data);
});
