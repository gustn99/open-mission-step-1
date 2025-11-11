class OutputView {
  static append(parent, data) {
    const container = document.createElement("p");
    container.innerText = data;
    parent.appendChild(container);
  }

  static replace(parent, data) {
    const container = document.createElement("p");
    container.innerText = data;
    parent.replaceChildren(container);
  }
}

export default OutputView;
