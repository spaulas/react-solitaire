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
        highScore: action.data,
        highScoreRef: () => {
          return action.highScoreRef;
        }
      };

    case HighScoresActionTypes.SET_OFFLINE_HIGHSCORES:
      const currentLocal = localStorage.getItem("offlineHighScores");
      const offlineHighScores = currentLocal
        ? JSON.parse(currentLocal)
        : undefined;

      console.log("offlineHighScores = ", offlineHighScores);
      if (!offlineHighScores) {
        console.log("set1 = ", INITIAL_HIGHSCORE);
        localStorage.setItem(
          "offlineHighScores",
          JSON.stringify(INITIAL_HIGHSCORE)
        );
      }
      if (offlineHighScores) {
        console.log("set2 = ", {
          ...offlineHighScores,
          highScoreRef: undefined
        });
        return {
          ...offlineHighScores,
          highScoreRef: undefined
        };
      }
      console.log("setting state- ", {
        highScoreRef: undefined,
        highScore: {
          ...INITIAL_HIGHSCORE
        }
      });
      return {
        highScoreRef: undefined,
        highScore: {
          ...INITIAL_HIGHSCORE
        }
      };

    case HighScoresActionTypes.HAS_NEW_HIGHSCORE:
      let finalHasNewHighScore = false;
      console.log("has new highscore? initial state = ", state);
      if (state.highScore?.highScores?.length < 10) {
        finalHasNewHighScore = true;
      } else {
        const result = state.highScore?.highScores?.find(
          (highScore: HighScore) => {
            return action.finalScore < highScore.finalScore;
          }
        );
        if (result) {
          finalHasNewHighScore = true;
        }
      }

      console.log("HAS_NEW_HIGHSCORE final state = ", {
        ...state,
        highScore: {
          ...state.highScore,
          hasNewHighScore: finalHasNewHighScore
        }
      });

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

      if (typeof state.highscoreRef === "function") {
        console.log("saving online highscore = ", {
          ...state.highScore,
          highScores: finalHighScores
        });
        // add to firebase
        state.highscoreRef().set({
          ...state.highScore,
          highScores: finalHighScores
        });
      } else {
        console.log("saving offline highscore = ", {
          ...state.highScore,
          highScores: finalHighScores
        });
        // add to localStorage
        localStorage.setItem(
          "offlineHighScores",
          JSON.stringify({ ...state.highScore, highScores: finalHighScores })
        );
      }

      console.log("saving redux highsore = ", {
        ...state,
        highScore: { highScores: finalHighScores, hasNewHighScore: false }
      });

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
