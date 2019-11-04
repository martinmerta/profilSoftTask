const div_container = document.querySelector(".container");
const form_button = document.querySelector(".form_button");
const form_input = document.querySelector(".form_input");
const select = document.querySelector(".select_sort");
const endPar = document.querySelector(".end");
const inputFilter = document.querySelector(".input_filter");

//const API_KEY = process.env.API_KEY;

const viewModel = async (
  quantityFunc,
  fetchAllTitlesFunc,
  fetchSingleTitleFunc,
  fetchReadyDataFunc,
  fetchFunc,
  title,
  sortFunc,
  sortBy,
  appendFunc,
  htmlElement,
  createElementsFunc,
  endMessageFunc
) => {
  const quantityOfTitles = await quantityFunc(title);
  if (!quantityOfTitles) {
    return;
  }
  const fetchedAllTitles = await fetchAllTitlesFunc(
    title,
    quantityOfTitles,
    fetchSingleTitleFunc
  );
  const data = await fetchFunc(fetchedAllTitles, fetchReadyDataFunc);

  if (data) {
    const sortedData = await sortFunc(data, sortBy);
    await appendFunc(
      htmlElement,
      sortedData,
      createElementsFunc,
      endMessageFunc
    );
  } else return;
};
form_button.addEventListener("click", e => {
  e.preventDefault();
  div_container.innerHTML = "";
  const title = form_input.value;
  const sortBy = select.value;
  const filterBy = inputFilter.value;
  viewModel(
    quantityOfTitles,
    fetchAllTitles,
    fetchTitle,
    fetchReadyData,
    fetchApi,
    title,
    sortResults,
    sortBy,
    appendToDiv,
    div_container,
    createElementsToAppend,
    messageEndOfResults
  );
});

form_input.addEventListener("input", () => {
  if (form_input.value === "") {
    endOfLoad = false;
    endPar.style.display = "none";
    div_container.innerText = "Please type what you want to search ;) ";
  }
});

select.addEventListener("input", e => {
  e.preventDefault();
  div_container.innerHTML = "";
  endPar.style.display = "none";
  endOfLoad = false;
  const title = form_input.value;
  const sortBy = select.value;
  viewModel(
    quantityOfTitles,
    fetchAllTitles,
    fetchTitle,
    fetchReadyData,
    fetchApi,
    title,
    sortResults,
    sortBy,
    appendToDiv,
    div_container,
    createElementsToAppend,
    messageEndOfResults
  );
});
