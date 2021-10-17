import {getRandomPositiveInteger} from './get-random-positive-integer.js';

const MESSAGE_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAME_COMMENT = [
  'Артем',
  'Иван',
  'Зоя',
  'Михаил',
  'Мария',
  'София',
  'Алексей',
  'Феофан',
  'Кирилл',
  'Лукерья',
];

const DESCRIPTION_POST = [
  'Описание 1',
  'Описание 2',
  'Описание 3',
  'Описание 4',
  'Описание 5',
  'Описание 6',
  'Описание 7',
  'Описание 8',
  'Описание 9',
  'Описание 10',
];

const getShuffledMessageComment = MESSAGE_COMMENT.sort(() => 0.5 - Math.random());

const getRandomMessageComment = getShuffledMessageComment.slice(0, 2);

const getRandomNameComment = NAME_COMMENT[Math.floor(Math.random()*NAME_COMMENT.length)];

const getRandomDescriptionPost = DESCRIPTION_POST[Math.floor(Math.random()*DESCRIPTION_POST.length)];

/**
 * генерация объекта комментария
 * @returns {object} - сгенерированный объект комментария
 */
const generateComment = () => {
  return {
    id: getRandomPositiveInteger(1, 1000),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomMessageComment,
    name: getRandomNameComment,
  };
};

/**
 * генерация объекта поста
 * @returns {object} - сгенерированный объект поста
 */
const generatePost = () => {
  return {
    id: getRandomPositiveInteger(1, 25),
    url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
    description: getRandomDescriptionPost,
    likes: getRandomPositiveInteger(15, 200),
    comments: generateComment(),
  };
};

const generatePosts = (count) => [...Array(count)].map(generatePost);

export {generatePosts};
