import React, { memo } from "react";
import DeckPile from "../Cards/DeckPile/DeckPile";
import FlippedPile from "../Cards/FlippedPile/FlippedPile";
import { RefAny } from "../../../global";

interface DeckProps {
  deckRef: RefAny;
  flippedRef: RefAny;
}

function Deck({ deckRef, flippedRef }: DeckProps) {
  return (
    <>
      <DeckPile ref={deckRef} />
      <FlippedPile ref={flippedRef} />
    </>
  );
}

export default memo(Deck);
