import React from "react";
import { useHistory } from "react-router-dom";

/**
 * Button to start the game, by redirecting to the /game location
 */

interface StartButtonProps {
  className?: string;
}

function StartButton({ className }: StartButtonProps) {
  const history = useHistory();
  return (
    <div
      className={`startButton divButton ${className}`}
      onClick={() => history.push("/game")}
    >
      <span>Start Game</span>
    </div>
  );
}

export default StartButton;
