import PagesActionTypes from "./pages.types";
import { ValueOf } from "../../global";

const setStartPageAnimation = (value: boolean) => ({
  type: PagesActionTypes.SET_START_PAGE_ANIMATION,
  value
});

const setScoresPageAnimation = (value: boolean) => ({
  type: PagesActionTypes.SET_SCORES_PAGE_ANIMATION,
  value
});

// ********************************************************

const actionsCreators = Object.freeze({
  setStartPageAnimation,
  setScoresPageAnimation
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
