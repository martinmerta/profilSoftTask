const filterBy = (data, filter = "rating", searchValue) =>
  data.filter(movie => movie[filter] === searchValue);
