import CardBack from "../Cards/CardBack";
import React from "react";

function GameColumn({ offset }: { offset?: number }) {
  return <CardBack offset={offset} />;
}

export default GameColumn;
