import React from "react";
import { RootReducerState } from "../../../global";
import { useSelector } from "react-redux";

/**
 * Component that displays the number of movements of the game
 */
function GameMoves() {
  // get timer flag from the GameBoard redux state
  const { gameMoves } = useSelector(({ GameBoard }: RootReducerState) => ({
    gameMoves: GameBoard.gameMoves
  }));

  // print the game moves with the correct number of 0s before
  const printGameMoves = () => {
    if (gameMoves < 10) {
      return `00${gameMoves}`;
    }
    if (gameMoves < 100) {
      return `0${gameMoves}`;
    }
    return gameMoves;
  };

  return <div className="infoDisplay movesDisplay">{printGameMoves()}</div>;
}

export default GameMoves;
