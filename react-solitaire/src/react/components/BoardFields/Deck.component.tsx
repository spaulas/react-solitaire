import { DeckPile, FlippedPile } from "../Piles/Piles.items";
import React, { memo } from "react";

/**
 * Component that unites the Deck pile and the Flipped pile
 */
function Deck() {
  return (
    <>
      <DeckPile />
      <FlippedPile />
    </>
  );
}

export default memo(Deck);
