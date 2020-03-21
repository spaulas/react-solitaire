import { CardsPile } from "../Cards/CardsItems";
import React from "react";

function GameColumn({ offset }: { offset?: number }) {
  return <CardsPile offset={offset} />;
}

export default GameColumn;
