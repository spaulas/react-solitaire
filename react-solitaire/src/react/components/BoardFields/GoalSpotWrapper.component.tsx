import GoalSpot from "./GoalSpot.component";
import React from "react";

function GoalSpotWrapper() {
  return (
    <>
      <GoalSpot offset={3} />
      <GoalSpot />
      <GoalSpot />
      <GoalSpot />
    </>
  );
}

export default GoalSpotWrapper;
