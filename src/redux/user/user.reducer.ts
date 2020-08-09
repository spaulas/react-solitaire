/* eslint-disable no-console */
/* eslint-disable indent */
import { ActionsCreators } from "./user.actions";
import { ExplicitAny } from "../../global";
import UserActionTypes from "./user.types";
import { createGraphs } from "./user.utils";
import moment from "moment";

interface GameHistory {
  date: string;
  finalScore: number;
  moves: number;
  nHints: number;
  seconds: number;
  time: string;
}

export interface InitialUser {
  user: {
    userName: string;
    email?: string;
    maxMoves: number;
    maxTime: number;
    nGames: number;
    hasSavedGame: boolean;
    history: Array<GameHistory>;
    createdAt: any;
    savedGame: ExplicitAny;
    graphs: {
      winsRatio: ExplicitAny;
      moves: ExplicitAny;
      time: ExplicitAny;
    };
    settings: {
      language: string;
      joyride: {
        main: boolean;
        scores: boolean;
        statistics: boolean;
        game: boolean;
        gameOptions: boolean;
      };
    };
  };
  userRef: ExplicitAny;
  loggedIn: boolean | undefined;
}

const INITIAL_USER: InitialUser = {
  user: {
    userName: "localUser",
    email: undefined,
    maxMoves: 0,
    maxTime: 0,
    nGames: 0,
    hasSavedGame: false,
    history: [],
    createdAt: moment(),
    savedGame: {},
    graphs: {
      winsRatio: [],
      time: {},
      moves: {}
    },
    settings: {
      language: "en-US",
      joyride: {
        main: true,
        scores: true,
        statistics: true,
        game: true,
        gameOptions: true
      }
    }
  },
  userRef: undefined,
  loggedIn: undefined
};

const userReducer = (state = INITIAL_USER, action: ActionsCreators) => {
  switch (action.type) {
    case UserActionTypes.GET_LOCAL_STORAGE:
      const currentLocal = localStorage.getItem("offlineUser");
      const offlineUser = currentLocal ? JSON.parse(currentLocal) : undefined;
      if (!offlineUser) {
        localStorage.setItem("offlineUser", JSON.stringify(INITIAL_USER));
      }
      return {
        user: offlineUser || INITIAL_USER.user,
        userRef: undefined,
        loggedIn: false
      };

    case UserActionTypes.SAVE_USER:
      return {
        user: action.user,
        userRef: () => {
          return action.userRef;
        },
        loggedIn: true
      };

    case UserActionTypes.CHANGE_USER_SETTINGS:
      if (state.userRef) {
        // add to firebase
        state.userRef().set({
          ...state.user,
          ...action.changes
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({ ...state.user, ...action.changes })
        );
      }

      return { ...state, user: { ...state.user, ...action.changes } };

    case UserActionTypes.ADD_GAME:
      const finalGames = state.user.nGames + 1;
      if (state.userRef) {
        // add to firebase
        state.userRef().set({
          ...state.user,
          nGames: finalGames
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({ ...state.user, nGames: finalGames })
        );
      }

      return { ...state, user: { ...state.user, nGames: finalGames } };

    case UserActionTypes.GAME_OVER:
      // add game statistics to the history
      const finalHistory = [
        ...state.user.history,
        { ...action.gameStatistics, seconds: action.seconds }
      ];
      // check if there is a new max of game moves
      const finalMaxMoves =
        state.user.maxMoves < action.gameStatistics.moves
          ? action.gameStatistics.moves
          : state.user.maxMoves;
      // check if there is a new max of game time
      const finalMaxTime =
        state.user.maxTime < action.seconds
          ? action.seconds
          : state.user.maxTime;

      // update graphs
      const finalGraph = createGraphs(
        finalHistory,
        finalMaxMoves,
        finalMaxTime,
        state.user.nGames
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
        state.userRef().set({
          ...state.user,
          ...finalChanges
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({ ...state.user, ...finalChanges })
        );
      }
      return { ...state, user: { ...state.user, ...finalChanges } };

    case UserActionTypes.SAVE_GAME:
      if (state.userRef) {
        // add to firebase
        state.userRef().set({
          ...state.user,
          savedGame: action.savedGame,
          hasSavedGame: true
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({
            ...state.user,
            savedGame: action.savedGame,
            hasSavedGame: true
          })
        );
      }

      return {
        ...state,
        user: { ...state.user, savedGame: action.savedGame, hasSavedGame: true }
      };

    case UserActionTypes.CLEAR_SAVED_GAME:
      if (state.userRef) {
        // add to firebase
        state.userRef().set({
          ...state.user,
          savedGame: {},
          hasSavedGame: false
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({
            ...state.user,
            savedGame: {},
            hasSavedGame: false
          })
        );
      }
      return {
        ...state,
        user: { ...state.user, savedGame: {}, hasSavedGame: false }
      };

    case UserActionTypes.SET_JOYRIDE:
      if (state.userRef) {
        // add to firebase
        state.userRef().set({
          ...state.user,
          settings: {
            ...state.user.settings,
            joyride: action.joyride
          }
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineUser",
          JSON.stringify({
            ...state.user,
            settings: {
              ...state.user.settings,
              joyride: action.joyride
            }
          })
        );
      }
      return {
        ...state,
        user: {
          ...state.user,
          settings: {
            ...state.user.settings,
            joyride: action.joyride
          }
        }
      };

    case UserActionTypes.CLEAR_USER:
      return INITIAL_USER;

    case UserActionTypes.RESET_USER_REF:
      return {
        ...state,
        userRef: () => {
          return action.userRef;
        }
      };

    // ********************************************************

    default:
      return state;
  }
};

export default userReducer;
