const appendToDiv = (div, data, createElementsFunc, endMessageFunc) => {
  if (data.length < 12) {
    const fragment = createElementsFunc(data);
    div.appendChild(fragment);
    endMessageFunc(div);
  } else {
    const partOfData = createElementsFunc(data.slice(0, 12));
    const restOfData = createElementsFunc(data.slice(12));
    div.appendChild(partOfData);
    window.addEventListener(
      "scroll",
      onScrollEvent.bind(null, [div, restOfData])
    );
  }
};
