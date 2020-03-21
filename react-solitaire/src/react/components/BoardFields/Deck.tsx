/* eslint-disable no-console */
import { CardType, CardsPile } from "../Cards/CardsItems";
import React, { memo, useLayoutEffect, useRef, useState } from "react";
import { RefAny } from "../../../global";

function Deck() {
  const deckRef: RefAny = useRef();
  const flippedRef: RefAny = useRef();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [translation, setTranslation]: [RefAny, RefAny] = useState();

  const [piles, setPiles] = useState({
    deckPile: [
      { cardType: "spot", name: "deckSpot" },
      { cardType: "deck", translation: 243, name: "deckMiddle" },
      { cardType: "deck", translation: 243, name: "deckTop" }
    ],
    flippedPile: [{ cardType: "spot", name: "flippedSpot" }]
  });

  useLayoutEffect(() => {
    if (deckRef.current) {
      const deckX = deckRef?.current.getBoundingClientRect().x;
      const flippedX = flippedRef?.current.getBoundingClientRect().x;
      setTranslation(flippedX - deckX);
    }
  }, []);

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
