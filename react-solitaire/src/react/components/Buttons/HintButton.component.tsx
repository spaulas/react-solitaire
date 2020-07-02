import { useDispatch, useSelector } from "react-redux";
import DoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/DoubleClickHandler.component";
import HintHandler from "../CardMoveHandlers/DoubleClickHandlers/HintHandler";
import React from "react";
import { RootReducerState } from "../../../global";
import { StarFilled } from "@ant-design/icons";

function HintButton() {
  const dispatch = useDispatch();

  const { columns, goals, firstDeckCard } = useSelector(
    ({ Deck, Columns, Goal }: RootReducerState) => {
      const flippedPile = Deck.flippedPile;
      return {
        columns: Columns.columns,
        goals: Goal.goals,
        firstDeckCard:
          flippedPile[flippedPile.length === 0 ? 0 : flippedPile.length - 1]
      };
    }
  );

  const handler = new HintHandler(dispatch, columns, goals, firstDeckCard);
  return (
    <DoubleClickHandler handler={handler} doubleClick={false}>
      <StarFilled />
    </DoubleClickHandler>
  );
}

export default HintButton;
