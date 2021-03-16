import React from "react";

export const generateTitle = (searchText: string, results: object[]) => {
  if (searchText) {
    if (results.length) {
      return <h2 className="HomePage__title">{`Result for '${searchText}'`}</h2>;
    }
    return <h2 className="HomePage__title">{`Nothing was found for '${searchText}'`}</h2>;
  }
  return <h2 className="HomePage__title">The most recent games added to the website</h2>;
};
