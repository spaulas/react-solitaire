import GoalPile from "../Piles/GoalPile.component";
import React from "react";

/**
 * Component that unites all four game goal spots
 */
function GoalPileWrapper() {
  return (
    <>
      <GoalPile goalId="goal1Pile" offset={3} />
      <GoalPile goalId="goal2Pile" />
      <GoalPile goalId="goal3Pile" />
      <GoalPile goalId="goal4Pile" />
    </>
  );
}

export default GoalPileWrapper;
