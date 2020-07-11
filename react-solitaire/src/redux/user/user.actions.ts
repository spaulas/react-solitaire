import { ExplicitAny, ValueOf } from "../../global";
import UserActionTypes from "./user.types";

// ********************************************************

const getLocalStorage = () => ({
  type: UserActionTypes.GET_LOCAL_STORAGE
});

const saveUser = (user: ExplicitAny) => ({
  type: UserActionTypes.SAVE_USER,
  user
});

// ********************************************************

const actionsCreators = Object.freeze({
  getLocalStorage,
  saveUser
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
