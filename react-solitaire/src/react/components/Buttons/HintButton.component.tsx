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

  // create copy of the flipped pile to then send it reversed to the handler
  const flippedCopy = [...flippedPile];

  // create the hint handler
  const handler = new HintHandler(
    dispatch,
    columns,
    goals,
    deckPile,
    flippedCopy.reverse(),
    gameHints
  );
  // return the button with the double click handler and wrapped in a badge with the current number of hints given
  return (
    <Badge count={nHints} offset={[7, 25]}>
      <DoubleClickHandler handler={handler} doubleClick={false}>
        <StarFilled className="iconButton" />
      </DoubleClickHandler>
    </Badge>
  );
}

export default HintButton;
