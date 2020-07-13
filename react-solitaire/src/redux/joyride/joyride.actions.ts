import { ExplicitAny, ValueOf } from "../../global";
import JoyrideActionTypes from "./joyride.types";

// ********************************************************

const initJoyride = (
  page: string,
  steps: ExplicitAny,
  callback?: ExplicitAny
) => ({
  type: JoyrideActionTypes.INIT_JORYIDE,
  page,
  steps,
  callback
});

// ********************************************************

const actionsCreators = Object.freeze({
  initJoyride
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
