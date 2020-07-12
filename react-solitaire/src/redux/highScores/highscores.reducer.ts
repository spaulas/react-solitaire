/* eslint-disable indent */
import { ActionsCreators } from "./highscores.actions";
import { ExplicitAny } from "../../global";
import HighScoresActionTypes from "./highscores.types";

interface HighScore {
  userName: string;
  finalScore: number;
}

export interface InitialHighScores {
  highScores: Array<HighScore>;
  highscoreRef: ExplicitAny;
  hasNewHighScore: boolean;
}

const INITIAL_HIGHSCORE: InitialHighScores = {
  highScores: [],
  highscoreRef: undefined,
  hasNewHighScore: false
};

const userReducer = (state = INITIAL_HIGHSCORE, action: ActionsCreators) => {
  switch (action.type) {
    case HighScoresActionTypes.SET_ONLINE_HIGHSCORES:
      return action.data;

    case HighScoresActionTypes.SET_OFFLINE_HIGHSCORES:
      const currentLocal = localStorage.getItem("offlineHighScores");
      const offlineHighScores = currentLocal
        ? JSON.parse(currentLocal)
        : undefined;
      if (!offlineHighScores) {
        localStorage.setItem(
          "offlineHighScores",
          JSON.stringify(INITIAL_HIGHSCORE)
        );
      }
      return offlineHighScores || INITIAL_HIGHSCORE;

    case HighScoresActionTypes.HAS_NEW_HIGHSCORE:
      let finalHasNewHighScore = false;
      if (state.highScores.length < 10) {
        finalHasNewHighScore = true;
      } else {
        const result = state.highScores.find((highScore: HighScore) => {
          return action.finalScore < highScore.finalScore;
        });
        if (result) {
          finalHasNewHighScore = true;
        }
      }

      return {
        ...state,
        hasNewHighScore: finalHasNewHighScore
      };

    case HighScoresActionTypes.ADD_HIGHSCORE:
      let finalHighScores: ExplicitAny = [];
      if (state.highScores.length < 10) {
        finalHighScores = [
          ...state.highScores,
          {
            userName: action.userName,
            finalScore: action.finalScore
          }
        ];
      } else {
        const result = state.highScores.find((highScore: HighScore) => {
          return action.finalScore < highScore.finalScore;
        });
        if (result) {
          finalHighScores = [
            ...state.highScores,
            {
              userName: action.userName,
              finalScore: action.finalScore
            }
          ];
        }
      }

      finalHighScores.sort((a: HighScore, b: HighScore) => {
        return a.finalScore < b.finalScore ? -1 : 1;
      });

      if (state.highscoreRef) {
        // add to firebase
        state.highscoreRef.set({
          ...state,
          highScores: finalHighScores
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineHighScores",
          JSON.stringify({ ...state, highScores: finalHighScores })
        );
      }

      return { ...state, highScores: finalHighScores, hasNewHighScore: false };

    // ********************************************************

    default:
      return state;
  }
};

export default userReducer;
