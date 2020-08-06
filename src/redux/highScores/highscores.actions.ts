import { ExplicitAny, ValueOf } from "../../global";
import HighScoresActionTypes from "./highscores.types";

// ********************************************************

const setOnlineHighScores = (data: ExplicitAny, highScoreRef: ExplicitAny) => ({
  type: HighScoresActionTypes.SET_ONLINE_HIGHSCORES,
  data,
  highScoreRef
});

const setOfflineHighScores = () => ({
  type: HighScoresActionTypes.SET_OFFLINE_HIGHSCORES
});

const hasNewHighScore = (finalScore: number) => ({
  type: HighScoresActionTypes.HAS_NEW_HIGHSCORE,
  finalScore
});

const addHighScore = (userName: string, finalScore: number) => ({
  type: HighScoresActionTypes.ADD_HIGHSCORE,
  userName,
  finalScore
});

const resetHighscoresRef = (highScoreRef: ExplicitAny) => ({
  type: HighScoresActionTypes.RESET_HIGHSCORES_REF,
  highScoreRef
});

// ********************************************************

const actionsCreators = Object.freeze({
  setOnlineHighScores,
  setOfflineHighScores,
  hasNewHighScore,
  addHighScore,
  resetHighscoresRef
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
