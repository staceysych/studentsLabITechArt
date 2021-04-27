export const getUniqueItems = (arr, key) => {
  console.log("get unique items");
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};
