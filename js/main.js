import {generatePosts} from './mock/generate-post.js';
import {renderMiniatures} from './miniatures.js';
import './form.js';
import './form-validation.js';

const POSTS_COUNT = 19;
const postsData = generatePosts(POSTS_COUNT);

renderMiniatures(postsData);
