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

const changeUserName = (userName: string) => ({
  type: UserActionTypes.CHANGE_USERNAME,
  userName
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

// ********************************************************

const actionsCreators = Object.freeze({
  getLocalStorage,
  saveUser,
  changeUserName,
  addGame,
  gameOver,
  saveGame,
  clearSavedGame,
  setJoyride
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
