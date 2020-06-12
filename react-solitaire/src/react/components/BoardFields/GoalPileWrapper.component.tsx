import GoalPile from "../Piles/GoalPile.component";
import React from "react";

/**
 * Component that unites all four game goal spots
 */
function GoalPileWrapper() {
  return (
    <>
      <GoalPile offset={3} />
      <GoalPile />
      <GoalPile />
      <GoalPile />
    </>
  );
}

export default GoalPileWrapper;
