import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { convertDateToSec } from "../src/utils/convertDateToSec";
import { getDate } from "../src/utils/getDate";
import { validateEmail } from "../src/utils/validateEmail";
import { getInitialState } from "../src/utils";

const createMockStore = () => {
  const mockStore = configureStore([thunk]);
  return mockStore;
};

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
    });
  });
});
