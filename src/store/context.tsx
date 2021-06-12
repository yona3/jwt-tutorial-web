import type { Dispatch, ReactNode, VFC } from "react";
import { createContext, useReducer } from "react";

import type { Action, State } from "../types";
import { reducer } from "./reducer";

interface Props {
  children: ReactNode;
}

interface InitialValue {
  state: State;
  dispatch: Dispatch<Action>;
}

export const AppContext = createContext({} as InitialValue);

export const RootComponent: VFC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { accessToken: null } as State);
  return (
    <AppContext.Provider value={{ state, dispatch } as InitialValue}>
      {children}
    </AppContext.Provider>
  );
};
