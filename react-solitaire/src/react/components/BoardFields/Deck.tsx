import { CardFlippable, CardSpot } from "../Cards/CardsItems";
import React, { memo, useLayoutEffect, useRef, useState } from "react";
import { RefAny } from "../../../global";

function Deck() {
  const deckRef: RefAny = useRef();
  const flippedRef: RefAny = useRef();
  const [translation, setTranslation] = useState(0);

  useLayoutEffect(() => {
    if (deckRef.current) {
      const deckX = deckRef?.current.getBoundingClientRect().x;
      const flippedX = flippedRef?.current.getBoundingClientRect().x;
      setTranslation(flippedX - deckX);
    }
  }, []);

  return (
    <>
      <CardFlippable ref={deckRef} translation={translation} offset={2} />
      <CardSpot ref={flippedRef} />
    </>
  );
}

export default memo(Deck);
