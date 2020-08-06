/* eslint-disable indent */
import { ActionsCreators } from "./joyride.actions";
import { ExplicitAny } from "../../global";
import JoyrideActionTypes from "./joyride.types";

export interface InitialJoyride {
  page?: string;
  steps: ExplicitAny;
  callback?: ExplicitAny;
}

const INITIAL_JOYRIDE: InitialJoyride = {
  page: undefined,
  steps: [],
  callback: undefined
};

const userReducer = (state = INITIAL_JOYRIDE, action: ActionsCreators) => {
  switch (action.type) {
    case JoyrideActionTypes.INIT_JORYIDE:
      return {
        page: action.page,
        steps: action.steps,
        callback: action.callback
      };
    // ********************************************************

    default:
      return state;
  }
};

export default userReducer;
