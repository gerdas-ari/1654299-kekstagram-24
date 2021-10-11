function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength('Добро пожаловать в Звенигород', 140);

export {checkStringLength};
