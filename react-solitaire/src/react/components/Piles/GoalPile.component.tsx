import { CardSpot } from "../Cards/Cards.items";
import React from "react";

/* Component for one of the four game goal spots */
function GoalSpot({ offset }: { offset?: number }) {
  return <CardSpot offset={offset} />;
}

export default GoalSpot;
