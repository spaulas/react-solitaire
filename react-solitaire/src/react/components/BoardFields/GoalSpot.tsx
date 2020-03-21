import { CardsPile } from "../Cards/CardsItems";
import React from "react";

function GoalSpot({ offset }: { offset?: number }) {
  return <CardsPile offset={offset} />;
}

export default GoalSpot;
