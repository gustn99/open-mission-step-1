import Consumer from "./domains/Consumer.js";

class App {
  constructor() {}

  async run() {
    const consumer = new Consumer();
    consumer.purchaseLotto(3000);
  }
}

export default App;
