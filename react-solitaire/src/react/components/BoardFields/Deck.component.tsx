import React, { memo } from "react";
import DeckPile from "../Piles/DeckPile.component";
import FlippedPile from "../Piles/FlippedPile.component";

function Deck() {
  return (
    <>
      <DeckPile />
      <FlippedPile />
    </>
  );
}

export default memo(Deck);
