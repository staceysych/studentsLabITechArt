import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const createMockStore = () => {
  const mockStore = configureStore([thunk]);
  return mockStore;
};

export { createMockStore };
