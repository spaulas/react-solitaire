import {
  GameColumnWrapper,
  GameOptions,
  GameTopRow,
  GameplayInfo
} from "../components/BoardFields/BoardFieldsItems";
import React from "react";

function GameBoard() {
  return (
    <div className="gameBoard">
      <GameplayInfo />
      <GameTopRow />
      <GameColumnWrapper />
      <GameOptions />
    </div>
  );
}

export default GameBoard;
