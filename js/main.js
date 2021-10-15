import {generatePosts} from './mock/generate-post.js';
import {renderMiniatures} from './miniatures.js';

const POSTS_COUNT = 15;
const postsData = generatePosts(POSTS_COUNT);

const miniatureData = renderMiniatures(POSTS_COUNT);
