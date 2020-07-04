import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import DoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/DoubleClickHandler.component";
import HintHandler from "../CardMoveHandlers/DoubleClickHandlers/HintHandler";
import React from "react";
import { RootReducerState } from "../../../global";
import { StarFilled } from "@ant-design/icons";

function HintButton() {
  const dispatch = useDispatch();

  const { columns, goals, flippedPile, hints } = useSelector(
    ({ Deck, Columns, Goal, GameBoard }: RootReducerState) => {
      return {
        columns: Columns.columns,
        goals: Goal.goals,
        flippedPile: Deck.flippedPile,
        hints: GameBoard.gameHints
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
    <Badge count={hints} offset={[-5, 15]}>
      <DoubleClickHandler handler={handler} doubleClick={false}>
        <StarFilled className="iconButton" />
      </DoubleClickHandler>
    </Badge>
  );
}

export default HintButton;
