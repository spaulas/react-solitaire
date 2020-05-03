import React, { memo, useEffect, useLayoutEffect, useRef } from "react";
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

  const mountDeck = () => {
    // set this refs at the redux
    dispatch(deckActions.setRefs(deckRef, flippedRef));

    // create new deck
    dispatch(deckActions.createDeck());
  };

  useEffect(mountDeck, []);

  // when a change in the layout is detected, recalculate the distance between the two piles
  useLayoutEffect(() => {
    if (deckRef.current && flippedRef.current) {
      const deckX = deckRef.current.getBoundingClientRect().x;
      const flippedX = flippedRef.current.getBoundingClientRect().x;
      // eslint-disable-next-line no-console
      console.log("setting translation to = ", flippedX - deckX);
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
