const MAX_COMMENT_LENGTH = 140;
const HASHTAG_COUNT = 5;
const HASHTAG_LENGTH = 20;
const hashtagValid = /^#[A-Za-zА-Яа-яЁё0-9]*$|(^$)/;

const hashtagInput = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');


const checkCommentValid = () => {
  commentTextarea.addEventListener('input', () => {
    const commentValueLength = commentTextarea.value.length;

    if (commentValueLength <= MAX_COMMENT_LENGTH) {
      commentTextarea.setCustomValidity(`Ещё ${ MAX_COMMENT_LENGTH - commentValueLength } симв.`);
    }
    commentTextarea.reportValidity();
  });
};

const checkHashtagValid = () => {
  hashtagInput.addEventListener('input', () => {
    hashtagInput.value = hashtagInput.value.toLowerCase().replace(/\s+/g, ' ');

    const hashtagArray = hashtagInput.value.split(' ');
    const errorArray = [];

    const hasDuplicates = () => {
      const counts = [];

      for (let i = 0; i <= hashtagArray.length; i++) {
        if (counts[hashtagArray[i]] === undefined) {
          counts[hashtagArray[i]] = 1;
        } else {
          return true;
        }
      }
      return false;
    };

    hashtagArray.forEach((tag) => {
      if (!tag.startsWith('#')) {
        errorArray.push('Хештеги должны начинаться с "#" и отделяться пробелом');
      }
      if (tag === '') {
        errorArray.length = 0;
      }
      if (tag === '#') {
        errorArray.push('Хештег не может состоять только из "#');
      }
      if (!hashtagValid.test(tag)) {
        errorArray.push('Хештеги должны состоять только из букв и чисел');
      }
      if (tag.length > HASHTAG_LENGTH) {
        errorArray.push(`Хештег не может быть длиннее ${HASHTAG_LENGTH} символов`);
      }
      if (hasDuplicates(hashtagArray) === true) {
        errorArray.push('Хештеги не могут повторяться');
      }
      if (hashtagArray.length > HASHTAG_COUNT && hashtagArray[HASHTAG_COUNT] !== '') {
        errorArray.push(`Нельзя добавлять более ${HASHTAG_COUNT} хештегов`);
      }
    });
    if (hashtagArray[0] === '') {
      hashtagInput.value = hashtagInput.value.trim();
      hashtagInput.setCustomValidity('');
    } else if (errorArray.length === 0) {
      hashtagInput.setCustomValidity('');
    } else {
      hashtagInput.setCustomValidity(errorArray[0]);
    }
    hashtagInput.reportValidity();
  });
};

export {hashtagInput, commentTextarea, checkHashtagValid, checkCommentValid};
