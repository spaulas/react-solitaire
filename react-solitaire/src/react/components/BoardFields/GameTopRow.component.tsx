import React, { memo } from "react";
import Deck from "./Deck.component";
import GoalPileWrapper from "./GoalPileWrapper.component";
import { Row } from "antd";

/**
 * Component that unites the two elements of the first game row: the deck and the goal spots
 */
function GameTopRow() {
  return (
    <Row gutter={6} className="boardDeckRow" align="middle">
      <Deck />
      <GoalPileWrapper />
    </Row>
  );
}

export default memo(GameTopRow);
