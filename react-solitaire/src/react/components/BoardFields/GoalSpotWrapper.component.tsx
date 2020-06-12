import GoalSpot from "./GoalSpot.component";
import React from "react";

/**
 * Component that unites all four game goal spots
 */
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
