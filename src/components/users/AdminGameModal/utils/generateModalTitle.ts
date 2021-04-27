import { CONSTANTS } from "../../../../constants";

export const generateModalTitle = (action: string, name: string) => {
  switch (action) {
    case CONSTANTS.EDIT_PRODUCT:
      return "Edit product";
    case CONSTANTS.DELETE_PRODUCT:
      return `Are you sure you want to delete the product ${name}?`;
    default:
      return "Add a new product";
  }
};
