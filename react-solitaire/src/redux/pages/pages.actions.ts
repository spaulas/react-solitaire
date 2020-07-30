import { ExplicitAny, ValueOf } from "../../global";
import PagesActionTypes from "./pages.types";
import { ReactNode } from "react";

const setStartPageAnimation = (value: boolean) => ({
  type: PagesActionTypes.SET_START_PAGE_ANIMATION,
  value
});

const setConfirmationModal = (
  message1: ReactNode,
  message2: ReactNode,
  onCancel: ExplicitAny,
  onConfirm: ExplicitAny,
  className = ""
) => ({
  type: PagesActionTypes.SET_CONFIRMATION_MODAL,
  message1,
  message2,
  onCancel,
  onConfirm,
  className
});

// ********************************************************

const actionsCreators = Object.freeze({
  setStartPageAnimation,
  setConfirmationModal
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
