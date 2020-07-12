/* eslint-disable indent */
import { ActionsCreators } from "./user.actions";
import { ExplicitAny } from "../../global";
import UserActionTypes from "./user.types";
import { createGraphs } from "./user.utils";

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
  email: string;
  graphs: {
    winsRatio: ExplicitAny;
    moves: ExplicitAny;
    time: ExplicitAny;
  };
  settings: {
    language: string;
  };
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
  userRef: undefined,
  email: "",
  graphs: {
    winsRatio: [],
    time: {},
    moves: {}
  },
  settings: {
    language: "pt-PT"
  }
};

const userReducer = (state = INITIAL_USER, action: ActionsCreators) => {
  switch (action.type) {
    case UserActionTypes.GET_LOCAL_STORAGE:
      const currentLocal = localStorage.getItem("offlineUser");
      const offlineUser = currentLocal ? JSON.parse(currentLocal) : undefined;
      if (!offlineUser) {
        localStorage.setItem("offlineUser", JSON.stringify(INITIAL_USER));
      }
      return offlineUser || INITIAL_USER;

    case UserActionTypes.SAVE_USER:
      return action.user;

    case UserActionTypes.CHANGE_USERNAME:
      if (state.userRef) {
        // add to firebase
        state.userRef.set({
          ...state,
          userName: action.userName
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({ ...state, userName: action.userName })
        );
      }

      return { ...state, userName: action.userName };

    case UserActionTypes.ADD_GAME:
      const finalGames = state.nGames + 1;
      if (state.userRef) {
        // add to firebase
        state.userRef.set({
          ...state,
          nGames: finalGames
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({ ...state, nGames: finalGames })
        );
      }

      return { ...state, nGames: finalGames };

    case UserActionTypes.GAME_OVER:
      // add game statistics to the history
      const finalHistory = [
        ...state.history,
        { ...action.gameStatistics, seconds: action.seconds }
      ];
      // check if there is a new max of game moves
      const finalMaxMoves =
        state.maxMoves < action.gameStatistics.moves
          ? action.gameStatistics.moves
          : state.maxMoves;
      // check if there is a new max of game time
      const finalMaxTime =
        state.maxTime < action.seconds ? action.seconds : state.maxTime;

      // update graphs
      const finalGraph = createGraphs(
        finalHistory,
        finalMaxMoves,
        finalMaxTime,
        state.nGames
      );

      const finalChanges = {
        history: finalHistory,
        maxMoves: finalMaxMoves,
        maxTime: finalMaxTime,
        graphs: finalGraph
      };
      // handle highscore!
      if (state.userRef) {
        // add to firebase
        state.userRef.set({
          ...state,
          ...finalChanges
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({ ...state, ...finalChanges })
        );
      }
      return { ...state, history: finalHistory };

    case UserActionTypes.SAVE_GAME:
      if (state.userRef) {
        // add to firebase
        state.userRef.set({
          ...state,
          savedGame: action.savedGame,
          hasSavedGame: true
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({
            ...state,
            savedGame: action.savedGame,
            hasSavedGame: true
          })
        );
      }

      return { ...state, savedGame: action.savedGame, hasSavedGame: true };

    case UserActionTypes.CLEAR_SAVED_GAME:
      if (state.userRef) {
        // add to firebase
        state.userRef.set({
          ...state,
          savedGame: {},
          hasSavedGame: false
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({
            ...state,
            savedGame: {},
            hasSavedGame: false
          })
        );
      }
      return { ...state, savedGame: {}, hasSavedGame: false };

    // ********************************************************

    default:
      return state;
  }
};

export default userReducer;
