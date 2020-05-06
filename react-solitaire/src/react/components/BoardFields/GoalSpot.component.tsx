import { CardSpot } from "../Cards/Cards.items";
import React from "react";

function GoalSpot({ offset }: { offset?: number }) {
  return <CardSpot cardId={-1} offset={offset} />;
}

export default GoalSpot;
