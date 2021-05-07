import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import AboutPage from "../src/components/products/AboutPage";

import { createMockStore } from "../src/helpers/testHelpers";

import { getInitialState } from "../src/utils";

const mockStore = createMockStore();

describe("Snapshot testing", () => {
  let store;
  let component;

  beforeEach(() => {
    const state = getInitialState();

    store = mockStore(state);
  });

  it("AboutPage renders correctly", () => {
    component = renderer.create(
      <Provider store={store}>
        <AboutPage />
      </Provider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
