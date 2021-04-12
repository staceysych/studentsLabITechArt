import { SET_ERRORS } from "../types/index";

import { IErrors } from "../../../utils/interfaces";

const setErrors = (errors: IErrors) => ({ type: SET_ERRORS, errors });

export default {
  setErrors,
};
