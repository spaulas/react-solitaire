import { ExplicitAny, ValueOf } from "../../global";
import HighScoresActionTypes from "./highscores.types";

// ********************************************************

const setOnlineHighScores = (data: ExplicitAny) => ({
  type: HighScoresActionTypes.SET_ONLINE_HIGHSCORES,
  data
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
