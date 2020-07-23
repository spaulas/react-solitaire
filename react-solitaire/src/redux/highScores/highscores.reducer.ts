/* eslint-disable indent */
import { ActionsCreators } from "./highscores.actions";
import { ExplicitAny } from "../../global";
import HighScoresActionTypes from "./highscores.types";

interface HighScore {
  userName: string;
  finalScore: number;
}

export interface InitialHighScores {
  highScore: {
    highScores: Array<HighScore>;
    hasNewHighScore: boolean;
  };
  highscoreRef: ExplicitAny;
}

const INITIAL_HIGHSCORE: InitialHighScores = {
  highScore: {
    highScores: [],
    hasNewHighScore: false
  },
  highscoreRef: undefined
};

const userReducer = (state = INITIAL_HIGHSCORE, action: ActionsCreators) => {
  switch (action.type) {
    case HighScoresActionTypes.SET_ONLINE_HIGHSCORES:
      return {
        highscore: action.data,
        highscoreRef: () => {
          return action.highScoreRef;
        }
      };

    case HighScoresActionTypes.SET_OFFLINE_HIGHSCORES:
      const currentLocal = localStorage.getItem("offlineHighScores");
      const offlineHighScores = currentLocal
        ? JSON.parse(currentLocal)
        : undefined;
      if (!offlineHighScores) {
        localStorage.setItem(
          "offlineHighScores",
          JSON.stringify(INITIAL_HIGHSCORE.highScore)
        );
      }
      return {
        highScore: offlineHighScores || INITIAL_HIGHSCORE,
        highScoreRef: undefined
      };

    case HighScoresActionTypes.HAS_NEW_HIGHSCORE:
      let finalHasNewHighScore = false;
      if (state.highScore?.highScores.length < 10) {
        finalHasNewHighScore = true;
      } else {
        const result = state.highScore?.highScores.find(
          (highScore: HighScore) => {
            return action.finalScore < highScore.finalScore;
          }
        );
        if (result) {
          finalHasNewHighScore = true;
        }
      }

      return {
        ...state,
        highScore: {
          ...state.highScore,
          hasNewHighScore: finalHasNewHighScore
        }
      };

    case HighScoresActionTypes.ADD_HIGHSCORE:
      let finalHighScores: ExplicitAny = [];
      if (state.highScore?.highScores.length < 10) {
        finalHighScores = [
          ...state.highScore?.highScores,
          {
            userName: action.userName,
            finalScore: action.finalScore
          }
        ];
      } else {
        const result = state.highScore?.highScores.find(
          (highScore: HighScore) => {
            return action.finalScore < highScore.finalScore;
          }
        );
        if (result) {
          finalHighScores = [
            ...state.highScore?.highScores,
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
        state.highscoreRef().set({
          ...state.highScore,
          highScores: finalHighScores
        });
      } else {
        // add to localStorage
        localStorage.setItem(
          "offlineHighScores",
          JSON.stringify({ ...state.highScore, highScores: finalHighScores })
        );
      }

      return {
        ...state,
        highScore: { highScores: finalHighScores, hasNewHighScore: false }
      };

    case HighScoresActionTypes.RESET_HIGHSCORES_REF:
      return {
        ...state,
        highscoreRef: () => {
          return action.highScoreRef;
        }
      };

    // ********************************************************

    default:
      return state;
  }
};

export default userReducer;
