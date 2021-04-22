export const generateBtnText = (action: string) => {
  switch (action) {
    case "edit-product":
      return "Edit product";
    case "delete-product":
      return "Delete product";
    default:
      return "Add product";
  }
};
