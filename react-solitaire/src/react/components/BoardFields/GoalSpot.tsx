import { CardSpot } from "../Cards/CardsItems";
import React from "react";

function GoalSpot({ offset }: { offset?: number }) {
  return <CardSpot offset={offset} />;
}

export default GoalSpot;
