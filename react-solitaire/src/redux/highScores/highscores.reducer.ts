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
}

const INITIAL_HIGHSCORE: InitialHighScores = {
  highScores: [],
  highscoreRef: undefined
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

    // ********************************************************

    default:
      return state;
  }
};

export default userReducer;
