const errorDiv = 'Something gone wrong, please try again later... :(';
const noResultMessage = `<p class="not_found">Sorry we don't have it in our database</p>`;
const messageEndOfResults = element => {
  const endParaph = document.createElement('p');
  endParaph.classList.add('container_endMessage');
  endParaph.innerText = 'There is no more results ;))';
  element.appendChild(endParaph);
};
