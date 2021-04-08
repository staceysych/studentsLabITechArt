export const generateTitleSearch = (searchText: string, results: object[]) => {
  if (searchText) {
    if (results.length) {
      return `Results for '${searchText}'`;
    }
    return `Nothing was found for '${searchText}'`;
  }
  return "The most recent games added to the website";
};
