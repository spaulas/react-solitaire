import React from "react";
import { RootReducerState } from "../../../global";
import { useSelector } from "react-redux";

function GameMoves() {
  // get timer flag from the GameBoard redux state
  const { gameMoves } = useSelector(({ GameBoard }: RootReducerState) => ({
    gameMoves: GameBoard.gameMoves
  }));

  // eslint-disable-next-line no-console
  console.log("GAME MOVES = ", gameMoves);

  return <div className="infoDisplay movesDisplay">{gameMoves}</div>;
}

export default GameMoves;
