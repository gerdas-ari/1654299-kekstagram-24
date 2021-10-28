import {generatePosts} from './mock/generate-post.js';
import {renderMiniatures} from './miniatures.js';
import './form.js';
import {checkCommentValid, checkHashtagValid} from './form-validation.js';
import {clickZoomOut, clickZoomIn} from './change-scale.js';
import './change-filter.js';

const POSTS_COUNT = 19;
const postsData = generatePosts(POSTS_COUNT);

renderMiniatures(postsData);
checkCommentValid();
checkHashtagValid();
clickZoomIn;
clickZoomOut;
