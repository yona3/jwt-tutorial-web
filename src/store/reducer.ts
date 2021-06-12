import type { Action, State } from "../types";
import { UPDATE_ACCESS_TOKEN } from "./action";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case UPDATE_ACCESS_TOKEN: {
      const { accessToken } = action;
      state.accessToken = accessToken;
      return state;
    }
    default:
      return state;
  }
};
