export const generateCustomClassName = (action: string) => {
  if (action === "delete-product") {
    return " Modal_delete";
  }
  return " Modal_add";
};
