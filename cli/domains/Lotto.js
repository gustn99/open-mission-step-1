class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }

    const numberSet = new Set(numbers);
    if (numbers.length > numberSet.size) {
      throw new Error("[ERROR] 로또 번호는 중복될 수 없습니다.");
    }

    const hasNumberBelowMin = numbers.some((num) => num < 1);
    const hasNumberAboveMax = numbers.some((num) => num > 45);
    if (hasNumberBelowMin || hasNumberAboveMax) {
      throw new Error("[ERROR] 로또 번호는 1에서 45 사이의 숫자여야 합니다.");
    }
  }

  // TODO: 추가 기능 구현
}

export default Lotto;
