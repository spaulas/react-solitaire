import HighScoresActionTypes from "./highscores.types";
import { ValueOf } from "../../global";

// ********************************************************

const setOnlineHighScores = () => ({
  type: HighScoresActionTypes.SET_ONLINE_HIGHSCORES
});

const setOfflineHighScores = () => ({
  type: HighScoresActionTypes.SET_OFFLINE_HIGHSCORES
});

// ********************************************************

const actionsCreators = Object.freeze({
  setOnlineHighScores,
  setOfflineHighScores
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
