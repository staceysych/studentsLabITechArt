import { CONSTANTS } from "../../../../constants";

import styles from "../../../../elements/modal/Modal.module.scss";

export const generateCustomClassName = (action: string) => {
  if (action === CONSTANTS.DELETE_PRODUCT) {
    return ` ${styles.delete}`;
  }
  return ` ${styles.add}`;
};
