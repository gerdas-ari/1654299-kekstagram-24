/**
 * Получение случайного целого положительного числа
 * @param {number} minNumber - минимальное число
 * @param {number} maxNumber - максимальное число
 * @returns {number} - сгенерированное случайное число
 */
const getRandomPositiveInteger = (minNumber, maxNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const upper = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));

  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export {getRandomPositiveInteger};

