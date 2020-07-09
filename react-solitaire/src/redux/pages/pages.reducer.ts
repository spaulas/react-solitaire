/* eslint-disable indent */
import { ActionsCreators } from "./pages.actions";
import PagesActionTypes from "./pages.types";

interface InitialPages {
  startPageAnimation: boolean;
  scoresPageAnimation: boolean;
}

const INITIAL_PAGES: InitialPages = {
  startPageAnimation: true,
  scoresPageAnimation: true
};

const pagesReducer = (state = INITIAL_PAGES, action: ActionsCreators) => {
  switch (action.type) {
    case PagesActionTypes.SET_START_PAGE_ANIMATION:
      return { ...state, startPageAnimation: action.value };
    case PagesActionTypes.SET_SCORES_PAGE_ANIMATION:
      return { ...state, scoresPageAnimation: action.value };
    default:
      return state;
  }
};

export default pagesReducer;
