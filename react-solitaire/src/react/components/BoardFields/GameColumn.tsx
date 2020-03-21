import CardSpot from "../Cards/CardSpot";
import React from "react";

function GameColumn({ offset }: { offset?: number }) {
  return <CardSpot offset={offset} />;
}

export default GameColumn;
