import React from "react";

import { IAppState } from "../utils/interfaces";

const AppContext = React.createContext<IAppState>(null);

export default AppContext;
