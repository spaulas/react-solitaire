import React, { memo, useLayoutEffect, useRef } from "react";
import DeckPile from "../Piles/DeckPile.component";
import FlippedPile from "../Piles/FlippedPile.component";
import { RefAny } from "../../../global";
import deckActions from "../../../redux/deck/deck.actions";
import { useDispatch } from "react-redux";

function Deck() {
  const dispatch = useDispatch();

  // create refs for the deck and flipped piles
  const deckRef: RefAny = useRef();
  const flippedRef: RefAny = useRef();

  // set this refs at the redux
  dispatch(deckActions.setRefs(deckRef, flippedRef));

  // when a change in the layout is detected, recalculate the distance between the two piles
  useLayoutEffect(() => {
    if (deckRef.current && flippedRef.current) {
      const deckX = deckRef.current.getBoundingClientRect().x;
      const flippedX = flippedRef.current.getBoundingClientRect().x;
      // save the distance at the redux
      dispatch(deckActions.setTranslation(flippedX - deckX));
    }
  });

  return (
    <>
      <DeckPile />
      <FlippedPile />
    </>
  );
}

export default memo(Deck);
