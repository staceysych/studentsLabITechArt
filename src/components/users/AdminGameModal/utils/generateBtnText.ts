import { CONSTANTS } from "../../../../constants";

export const generateBtnText = (action: string) => {
  switch (action) {
    case CONSTANTS.EDIT_PRODUCT:
      return "Edit product";
    case CONSTANTS.DELETE_PRODUCT:
      return "Delete product";
    default:
      return "Add product";
  }
};
