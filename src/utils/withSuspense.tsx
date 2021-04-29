import React, { Suspense } from "react";
import { Spinner } from "../elements";

export const withSuspense = (Component) => (props) => (
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
);
