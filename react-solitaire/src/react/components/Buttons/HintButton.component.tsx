import { useDispatch, useSelector } from "react-redux";
import DoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/DoubleClickHandler.component";
import HintHandler from "../CardMoveHandlers/DoubleClickHandlers/HintHandler";
import React from "react";
import { RootReducerState } from "../../../global";
import { StarFilled } from "@ant-design/icons";

function HintButton() {
  const dispatch = useDispatch();

  const { columns, goals, flippedPile } = useSelector(
    ({ Deck, Columns, Goal }: RootReducerState) => {
      return {
        columns: Columns.columns,
        goals: Goal.goals,
        flippedPile: Deck.flippedPile
      };
    }
  );

  const flippedCopy = [...flippedPile];

  const handler = new HintHandler(
    dispatch,
    columns,
    goals,
    flippedCopy.reverse()
  );
  return (
    <DoubleClickHandler handler={handler} doubleClick={false}>
      <StarFilled className="iconButton" />
    </DoubleClickHandler>
  );
}

export default HintButton;
