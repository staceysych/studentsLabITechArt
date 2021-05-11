import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import AboutPage from "../src/components/products/AboutPage";
import HomePage from "../src/components/products/HomePage";
import ProductsPage from "../src/components/products/ProductsPage";
import GameCard from "../src/components/products/GameCard";

import { createMockStore } from "../src/helpers/testHelpers";

import { getStateForTesting } from "../src/utils";

const mockStore = createMockStore();

describe("Snapshot testing", () => {
  let store;
  let component;

  beforeEach(() => {
    const state = getStateForTesting();

    store = mockStore(state);

    store.dispatch = jest.fn();
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

  it("HomePage renders correctly", () => {
    component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("ProductsPage renders correctly", () => {
    component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ProductsPage />
        </MemoryRouter>
      </Provider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("GameCard renders correctly", () => {
    const mockedProps = {
      id: 1,
      name: "GTA",
      rating: 5,
      price: 120,
      poster: "yandex.ru",
      date: "2010-08-12",
      genre: "shooter",
      age: "18",
      devise: "Xbox",
    };
    component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <GameCard obj={mockedProps} />
        </MemoryRouter>
      </Provider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
