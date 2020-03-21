import CardFace from "../Cards/CardFace";
import React from "react";

function GoalSpot({ offset }: { offset?: number }) {
  return <CardFace offset={offset} />;
}

export default GoalSpot;
