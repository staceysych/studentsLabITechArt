import { URLS } from "../../../../constants";

export const getTopProducts = async () => {
  const { SERVER_URL, TOP_PRODUCTS_URL } = URLS;

  const response = await fetch(`${SERVER_URL}${TOP_PRODUCTS_URL}`);
  const data = await response.json();

  return data;
};
