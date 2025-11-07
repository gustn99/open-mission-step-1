export const Random = {
  pickUniqueNumbersInRange(min, max, count) {
    const numbers = new Set();
    while (numbers.size < count) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(n);
    }
    return [...numbers];
  },
};
