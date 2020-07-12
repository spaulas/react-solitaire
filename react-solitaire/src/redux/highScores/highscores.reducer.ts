/* eslint-disable indent */
import { ActionsCreators } from "./highscores.actions";
import HighScoresActionTypes from "./highscores.types";

interface HighScore {
  userName: string;
  finalScore: number;
}

export interface InitialHighScores {
  topHighScores: Array<HighScore>;
}

const INITIAL_HIGHSCORE: InitialHighScores = {
  topHighScores: []
};

const userReducer = (state = INITIAL_HIGHSCORE, action: ActionsCreators) => {
  switch (action.type) {
    case HighScoresActionTypes.SET_OFFLINE_HIGHSCORES:
      return state;

    case HighScoresActionTypes.SET_ONLINE_HIGHSCORES:
      return state;

    // ********************************************************

    default:
      return state;
  }
};

export default userReducer;
