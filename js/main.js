function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(2, 43);

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random


const exampleString = 'Example string for my code';
const maxStringValue = 140;

function testingStringLength(max, string) {
  if (string.length <= max) {
    return true;
  }

  return false;
}

testingStringLength(exampleString, maxStringValue);
