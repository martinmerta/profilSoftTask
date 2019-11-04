const onScrollEvent = elements => {
  const bounding = document.body.getBoundingClientRect();
  const innerHeight = window.innerHeight;
  if (bounding.bottom < innerHeight) {
    endOfLoad = true;
    elements[0].appendChild(elements[1]);

    if (endOfLoad) {
      endPar.style.display = "block";
    }
  }
};
