import { CONSTANTS } from "../../../../constants";

export const generateCustomClassName = (action: string) => {
  if (action === CONSTANTS.DELETE_PRODUCT) {
    return " Modal_delete";
  }
  return " Modal_add";
};
