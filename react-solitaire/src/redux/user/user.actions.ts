import { ExplicitAny, ValueOf } from "../../global";
import UserActionTypes from "./user.types";

// ********************************************************

const getLocalStorage = () => ({
  type: UserActionTypes.GET_LOCAL_STORAGE
});

const saveUser = (user: ExplicitAny, userRef: ExplicitAny) => ({
  type: UserActionTypes.SAVE_USER,
  user,
  userRef
});

const changeUserSettings = (changes: ExplicitAny) => ({
  type: UserActionTypes.CHANGE_USER_SETTINGS,
  changes
});

const addGame = () => ({
  type: UserActionTypes.ADD_GAME
});

const gameOver = (gameStatistics: ExplicitAny, seconds: number) => ({
  type: UserActionTypes.GAME_OVER,
  gameStatistics,
  seconds
});

const saveGame = (savedGame: ExplicitAny) => ({
  type: UserActionTypes.SAVE_GAME,
  savedGame
});

const clearSavedGame = () => ({
  type: UserActionTypes.CLEAR_SAVED_GAME
});

const setJoyride = (joyride: ExplicitAny) => ({
  type: UserActionTypes.SET_JOYRIDE,
  joyride
});

const clearUser = () => ({
  type: UserActionTypes.CLEAR_USER
});

const resetUserRef = (userRef: ExplicitAny) => ({
  type: UserActionTypes.RESET_USER_REF,
  userRef
});

// ********************************************************

const actionsCreators = Object.freeze({
  getLocalStorage,
  saveUser,
  changeUserSettings,
  addGame,
  gameOver,
  saveGame,
  clearSavedGame,
  setJoyride,
  clearUser,
  resetUserRef
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
