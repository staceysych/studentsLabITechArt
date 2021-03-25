import { URLS } from "../../../../constants";

export const searchGame = async (search: string) => {
  const { SERVER_URL, SEARCH_URL } = URLS;
  const searchText = search.toLocaleLowerCase();

  const response = await fetch(`${SERVER_URL}${SEARCH_URL}${searchText}`);
  const data = await response.json();

  return data;
};
