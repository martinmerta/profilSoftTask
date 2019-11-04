const sortResults = (results, sortBy) => {
  if (sortBy === "rating") {
    return results.sort(
      (a, b) => b[sortBy].substr(0, 3) - a[sortBy].substr(0, 3)
    );
  } else {
    return results.sort((a, b) => a[sortBy] - b[sortBy]);
  }
};
