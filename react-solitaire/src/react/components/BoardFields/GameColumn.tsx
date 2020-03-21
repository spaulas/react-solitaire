import CardFlippable from "../Cards/CardFlippable";
import React from "react";

function GameColumn({ offset }: { offset?: number }) {
  return <CardFlippable offset={offset} />;
}

export default GameColumn;
