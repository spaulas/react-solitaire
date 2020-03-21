/* eslint-disable no-console */
import { CardType, CardsPile } from "../Cards/CardsItems";
import React, { memo, useLayoutEffect, useRef, useState } from "react";
import { RefAny } from "../../../global";

function Deck() {
  const deckRef: RefAny = useRef();
  const flippedRef: RefAny = useRef();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [translation, setTranslation]: [RefAny, RefAny] = useState();

  const [deckPile, setDeckPile] = useState([
    { cardType: "spot" },
    { cardType: "deck", translation: 243 },
    { cardType: "deck", translation: 243 }
  ]);

  const [flippedPile, setFlippedPile] = useState([{ cardType: "spot" }]);

  useLayoutEffect(() => {
    if (deckRef.current) {
      const deckX = deckRef?.current.getBoundingClientRect().x;
      const flippedX = flippedRef?.current.getBoundingClientRect().x;
      setTranslation(flippedX - deckX);
    }
  }, []);

  const handleDeckSwap = async (card: CardType) => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log("CARD REMOVED FROM DECK : ", card);
      const nDeck = deckPile.length;
      const tempDeck = deckPile.splice(0, nDeck - 2);
      const tempFlipped = [...flippedPile, card];

      setDeckPile(tempDeck);
      setFlippedPile(tempFlipped);
    }, 600);
  };

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
