import { CardSpot } from "../Cards/CardsItems";
import React from "react";

function GameColumn({ offset }: { offset?: number }) {
  return <CardSpot offset={offset} />;
}

export default GameColumn;
