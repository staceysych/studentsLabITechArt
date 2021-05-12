import { createMockStore } from "../src/helpers/testHelpers";

import { CONSTANTS } from "../src/constants";

import {
  convertDateToSec,
  getDate,
  validateEmail,
  getInitialState,
  validateLogin,
  validatePassword,
  validatePhone,
  validatePrevPassword,
} from "../src/utils";

const mockStore = createMockStore();

let store;
beforeEach(() => {
  const state = getInitialState();

  store = mockStore(state);
});

describe("Utils tests", () => {
  describe("Working with Date", () => {
    it("Should convert date string to seconds", () => {
      expect(convertDateToSec("2021-04-04")).toEqual(1617494400);
    });

    it("Should return current date as a string", () => {
      expect(getDate()).toEqual(expect.any(String));
    });

    it("Should return current date as a string in dd-mm-yyyy format if isOrder", () => {
      const isOrder: boolean = true;
      const regEx = /^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\d\d$/;
      expect(getDate(isOrder)).toMatch(regEx);
    });
  });

  describe("Validation", () => {
    it("Should return boolean", () => {
      expect(validateEmail("bla@y.ru", store.dispatch)).toEqual(expect.any(Boolean));
      expect(validateLogin("login", store.dispatch)).toEqual(expect.any(Boolean));
      expect(validatePassword(store.dispatch, "1234")).toEqual(expect.any(Boolean));
      expect(validatePhone("802911134", store.dispatch)).toEqual(expect.any(Boolean));
      expect(validatePrevPassword(store.dispatch, "1234", "145")).toEqual(expect.any(Boolean));
    });

    it("Should return true if valid", () => {
      const emailRegEx = CONSTANTS.EMAIL_RGX;
      const mockedEmail = "bla@y.ru";
      const loginRegEx = /^\S*$/;
      const mockedLogin = "tronasty23";
      const passwordRegEx = CONSTANTS.PASSWORD_RGX;
      const mockedPassword = "123Love!";

      if (emailRegEx.test(mockedEmail)) {
        expect(validateEmail(mockedEmail, store.dispatch)).toBeTruthy();
      }

      if (loginRegEx.test(mockedLogin)) {
        expect(validateLogin(mockedLogin, store.dispatch)).toBeTruthy();
      }

      if (passwordRegEx.test(mockedPassword)) {
        expect(validatePassword(store.dispatch, mockedPassword)).toBeTruthy();
      }
    });

    it("Should return false if passed data is falsy", () => {
      expect(validateEmail("", store.dispatch)).toBeFalsy();
      expect(validateLogin("", store.dispatch)).toBeFalsy();
      expect(validatePassword(store.dispatch, "")).toBeFalsy();
      expect(validatePhone("", store.dispatch)).toBeFalsy();
      expect(validatePrevPassword(store.dispatch, "1234", "")).toBeFalsy();
    });

    it("validatePassword should return false if while confirmation no confirmPassword was passed", () => {
      const needsToConfirm = true;
      const noConfirmPassword = "";
      const mockedPassword = "123";

      expect(validatePassword(store.dispatch, mockedPassword, noConfirmPassword, needsToConfirm)).toBeFalsy();
    });

    it("validatePassword should return false if password and confirmPassword don't match", () => {
      const needsToConfirm = true;
      const noConfirmPassword = "1234";
      const mockedPassword = "123";

      expect(validatePassword(store.dispatch, mockedPassword, noConfirmPassword, needsToConfirm)).toBeFalsy();
    });
  });
});
