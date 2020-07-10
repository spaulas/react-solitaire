import { ExplicitAny } from "../../../global";
import React from "react";
import { useHistory } from "react-router-dom";

interface ResumeSavedGameModalProps {
  onCancel: ExplicitAny;
}

function ResumeSavedGameModal({ onCancel }: ResumeSavedGameModalProps) {
  const history = useHistory();

  return (
    <div className="gameFullDiv">
      <div className="resumeGameQuestion">
        By starting a new game, the saved game will be lost. Do you wish to
        continue?
      </div>
      <div
        className={`animatedButton divButton resumeGameAnimatedButton resumeGameQuestion`}
        onClick={() => history.push("/game")}
      >
        <span>Yes</span>
      </div>
      <div
        className={`animatedButton divButton resumeGameAnimatedButton resumeGameQuestion`}
        onClick={onCancel}
      >
        <span>No</span>
      </div>
    </div>
  );
}

export default ResumeSavedGameModal;
