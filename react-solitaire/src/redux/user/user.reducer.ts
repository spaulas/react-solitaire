/* eslint-disable indent */
import { ActionsCreators } from "./user.actions";
import { ExplicitAny } from "../../global";
import UserActionTypes from "./user.types";

interface GameHistory {
  date: string;
  finalScore: number;
  moves: number;
  nHints: number;
  seconds: number;
  time: string;
}

export interface InitialUser {
  id: string;
  userName: string;
  maxMoves: number;
  maxTime: number;
  nGames: number;
  hasSavedGame: boolean;
  history: Array<GameHistory>;
  createdAt: Date;
  savedGame: ExplicitAny;
  userRef: ExplicitAny;
}

const INITIAL_USER: InitialUser = {
  id: "localStorageUser",
  userName: "localUser",
  maxMoves: 0,
  maxTime: 0,
  nGames: 0,
  hasSavedGame: false,
  history: [],
  createdAt: new Date(),
  savedGame: {},
  userRef: undefined
};

const userReducer = (state = INITIAL_USER, action: ActionsCreators) => {
  switch (action.type) {
    case UserActionTypes.GET_LOCAL_STORAGE:
      const currentLocal = localStorage.getItem("offlineUser");
      const offlineUser = currentLocal ? JSON.parse(currentLocal) : undefined;
      if (!offlineUser) {
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({ offlineUser: INITIAL_USER })
        );
      }
      return offlineUser || INITIAL_USER;

    case UserActionTypes.SAVE_USER:
      return action.user;

    // ********************************************************

    default:
      return state;
  }
};

export default userReducer;
