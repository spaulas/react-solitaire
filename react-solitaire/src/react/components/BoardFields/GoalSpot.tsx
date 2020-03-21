import CardSpot from "../Cards/CardSpot";
import React from "react";

function GoalSpot({ offset }: { offset?: number }) {
  return <CardSpot offset={offset} />;
}

export default GoalSpot;
