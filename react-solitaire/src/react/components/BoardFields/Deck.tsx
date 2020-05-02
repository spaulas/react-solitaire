/* eslint-disable no-console */
import React, { memo } from "react";
import { RefAny, RootReducerState } from "../../../global";
import { useDispatch, useSelector } from "react-redux";
import { CardsPile } from "../Cards/CardsItems";
import deckActions from "../../../redux/deck/deck.actions";

interface DeckProps {
  deckRef: RefAny;
  flippedRef: RefAny;
}

function Deck({ deckRef, flippedRef }: DeckProps) {
  const dispatch = useDispatch();
  // get piles from redux
  const { deckPile, flippedPile } = useSelector(
    ({ Deck }: RootReducerState) => ({
      deckPile: Deck.deckPile,
      flippedPile: Deck.flippedPile
    })
  );
  // swap from deck to flipped pile
  const handleDeckSwap = async () => {
    // wait for the css animation to end
    setTimeout(() => {
      dispatch(deckActions.sendDeckTopToFlippedPile());
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
