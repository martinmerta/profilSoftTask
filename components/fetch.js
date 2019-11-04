const fetchTitle = async (title, page) => {
  try {
    const data = await fetch(
      `http://www.omdbapi.com/?apikey=b12ebba0&s=${title}&page=${page}`
    );
    const jsonData = await data.json();
    if (jsonData.Resposne === "False") {
      div_container.innerHTML = `${
        form_input.value.length !== 0
          ? noResultMessage
          : `<p>"Please type title"</p>`
      }`;
      return false;
    }
    return jsonData;
  } catch (err) {
    return div_container.appendChild(errorDiv);
  }
};
const quantityOfTitles = async title => {
  try {
    const data = await fetch(
      `http://www.omdbapi.com/?apikey=b12ebba0&s=${title}`
    );
    const jsonData = await data.json();
    if (jsonData["Response"] === "False") {
      div_container.innerHTML = `${
        form_input.value.length !== 0
          ? noResultMessage
          : `<p>"Please type title"</p>`
      }`;
      return;
    }
    return parseInt(jsonData.totalResults);
  } catch (err) {
    return div_container.appendChild(errorDiv);
  }
};

const fetchAllTitles = async (title, quantity, titlesFunc) => {
  const data = [];
  try {
    for (let i = 1; i < quantity / 10; i++) {
      let titles = await titlesFunc(title, i);
      let mappedTitles = await titles["Search"].map(object => object.Title);
      await data.push(mappedTitles);
    }
  } catch (err) {
    return (div_container.innerText = "Something gone wrong");
  }
  return data;
};

const fetchReadyData = async title => {
  try {
    const data = await fetch(
      `http://www.omdbapi.com/?apikey=b12ebba0&t=${title}`
    );
    const jsonData = await data.json();
    if (jsonData.Resposne === "False") {
      div_container.innerHTML = `${
        form_input.value.length !== 0
          ? noResultMessage
          : `<p>"Please type title"</p>`
      }`;
      return;
    }
    return jsonData;
  } catch (err) {
    return div_container.appendChild(errorDiv);
  }
};

const fetchApi = async (titles, fetchReadyDataFunc) => {
  const arrayOfTitles = titles.flat(1);
  let data = [];
  for (let i = 0; i < 24 /*arrayOfTitles.length*/; i++) {
    let fullObject = await fetchReadyDataFunc(arrayOfTitles[i]);
    let mappedObject = {
      title:
        fullObject.Title !== "Undefined"
          ? fullObject.Title
          : "There is no title for this movie",
      runtime:
        fullObject.Runtime !== "N/A" ? fullObject.Runtime : "No information",
      released:
        fullObject.Released !== "N/A"
          ? new Date(fullObject.Released)
          : "No information",
      description:
        fullObject.Plot !== "N/A" ? fullObject.Plot : "No information",
      image:
        fullObject.Poster !== "N/A"
          ? fullObject.Poster
          : "../img/movie-918655_640.jpg",
      rating:
        fullObject.Ratings.length !== 0
          ? fullObject.Ratings[0].Value
          : "This movie don't have any rating",
      awards:
        fullObject.Awards !== "N/A" || undefined
          ? fullObject.Awards
          : "This movie have no awards"
    };
    data.push(mappedObject);
  }
  return data;
};
