import React from "react";
import renderer from "react-test-renderer";
import HomePage from "../src/components/products/HomePage";

it("HomePage renders correctly", () => {
  const tree = renderer.create(<HomePage />).toJSON();
  expect(tree).toMatchSnapshot();
});
