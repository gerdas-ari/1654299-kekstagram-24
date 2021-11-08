import {generatePosts} from './mock/generate-post.js';
import {renderMiniatures} from './miniatures.js';
import './form.js';
import {checkCommentValid, checkHashtagValid} from './form-validation.js';
import {initZoom} from './change-scale.js';
import './change-filter.js';
import { getServerData } from './api.js';

const POSTS_COUNT = 19;
const postsData = generatePosts(POSTS_COUNT);

renderMiniatures(postsData);
checkCommentValid();
checkHashtagValid();
initZoom();

getServerData((data) => {
  renderMiniatures(data);
});
