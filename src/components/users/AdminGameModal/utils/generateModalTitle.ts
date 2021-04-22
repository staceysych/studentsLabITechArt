export const generateModalTitle = (action: string, name: string) => {
  switch (action) {
    case "edit-product":
      return "Edit product";
    case "delete-product":
      return `Are you sure you want to delete the product ${name}?`;
    default:
      return "Add a new product";
  }
};
