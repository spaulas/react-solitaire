/* eslint-disable no-console */
import { CardType, CardsPile } from "../Cards/CardsItems";
import React, { memo, useState } from "react";
import { RefAny } from "../../../global";

interface DeckProps {
  deckRef: RefAny;
  flippedRef: RefAny;
  translation?: number;
}

function Deck({ deckRef, flippedRef, translation }: DeckProps) {
  const [piles, setPiles] = useState({
    deckPile: [
      { cardType: "spot", name: "deckSpot" },
      { cardType: "deck", translation, name: "deckMiddle" },
      { cardType: "deck", translation, name: "deckTop" }
    ],
    flippedPile: [{ cardType: "spot", name: "flippedSpot" }]
  });

  const handleDeckSwap = async (card: CardType) => {
    setTimeout(() => {
      const { deckPile, flippedPile } = piles;
      const nDeck = deckPile.length;
      const tempDeck = deckPile.splice(0, nDeck - 1);
      const tempFlipped = [
        ...flippedPile,
        { cardType: "flipped", name: card.name }
      ];

      setPiles({ deckPile: tempDeck, flippedPile: tempFlipped });
    }, 600);
  };

  const { deckPile, flippedPile } = piles;

  return (
    <>
      <CardsPile
        handleCardSwap={handleDeckSwap}
        ref={deckRef}
        offset={2}
        cardsArray={deckPile}
      />
      <CardsPile cardsArray={flippedPile} ref={flippedRef} />
    </>
  );
}

export default memo(Deck);
