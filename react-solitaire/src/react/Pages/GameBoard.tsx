import {
  GameColumnWrapper,
  GameOptions,
  GamePlayInfo,
  GameTopRow
} from "../components/BoardFields/BoardFieldsItems";
import React, { memo } from "react";

function GameBoard() {
  return (
    <div className="gameBoard">
      <GamePlayInfo />
      <GameTopRow />
      <GameColumnWrapper />
      <GameOptions />
    </div>
  );
}

export default memo(GameBoard);
