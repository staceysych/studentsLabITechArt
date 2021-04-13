export const searchGame = async (url: string) => {
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  return data;
};
