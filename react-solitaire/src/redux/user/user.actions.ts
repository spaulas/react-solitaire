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

const addGame = () => ({
  type: UserActionTypes.ADD_GAME
});

const gameOver = (gameStatistics: ExplicitAny, seconds: number) => ({
  type: UserActionTypes.GAME_OVER,
  gameStatistics,
  seconds
});

// ********************************************************

const actionsCreators = Object.freeze({
  getLocalStorage,
  saveUser,
  addGame,
  gameOver
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
