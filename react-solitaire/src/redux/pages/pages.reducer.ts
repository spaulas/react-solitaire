/* eslint-disable indent */
import { ActionsCreators } from "./pages.actions";
import { ExplicitAny } from "../../global";
import PagesActionTypes from "./pages.types";
import { ReactNode } from "react";

interface InitialPages {
  startPageAnimation: boolean;
  confirmationModalProps: {
    message1: ReactNode;
    message2: ReactNode;
    onCancel: ExplicitAny;
    onConfirm: ExplicitAny;
    className: string;
  };
}

const INITIAL_PAGES: InitialPages = {
  startPageAnimation: true,
  confirmationModalProps: {
    message1: "",
    message2: "",
    onCancel: undefined,
    onConfirm: undefined,
    className: ""
  }
};

const pagesReducer = (state = INITIAL_PAGES, action: ActionsCreators) => {
  switch (action.type) {
    case PagesActionTypes.SET_START_PAGE_ANIMATION:
      return { ...state, startPageAnimation: action.value };
    case PagesActionTypes.SET_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmationModalProps: {
          message1: action.message1,
          message2: action.message2,
          onCancel: action.onCancel,
          onConfirm: action.onConfirm,
          className: action.className
        }
      };
    default:
      return state;
  }
};

export default pagesReducer;
