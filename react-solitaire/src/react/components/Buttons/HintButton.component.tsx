import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import DoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/DoubleClickHandler.component";
import HintHandler from "../CardMoveHandlers/DoubleClickHandlers/HintHandler";
import React from "react";
import { RootReducerState } from "../../../global";
import { StarFilled } from "@ant-design/icons";

function HintButton() {
  const dispatch = useDispatch();

  const {
    columns,
    goals,
    deckPile,
    flippedPile,
    gameHints,
    nHints
  } = useSelector(({ Deck, Columns, Goal, GameBoard }: RootReducerState) => {
    return {
      columns: Columns.columns,
      goals: Goal.goals,
      deckPile: Deck.deckPile,
      flippedPile: Deck.flippedPile,
      gameHints: GameBoard.gameHints,
      nHints: GameBoard.nHints
    };
  });

  const flippedCopy = [...flippedPile];

  const handler = new HintHandler(
    dispatch,
    columns,
    goals,
    deckPile,
    flippedCopy.reverse(),
    gameHints
  );
  return (
    <Badge count={nHints} offset={[-5, 15]}>
      <DoubleClickHandler handler={handler} doubleClick={false}>
        <StarFilled className="iconButton" />
      </DoubleClickHandler>
    </Badge>
  );
}

export default HintButton;
