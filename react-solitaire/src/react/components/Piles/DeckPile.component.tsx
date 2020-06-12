import React, { forwardRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardFlippable } from "../Cards/Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { RootReducerState } from "../../../global";
import SimplePile from "./SimplePile.component";
import deckActions from "../../../redux/deck/deck.actions";

/**
 * Component that consists of a pile (3d) of unflipped cards that can be flipped one by one (with a translation)
 */
function DeckPile() {
  const dispatch = useDispatch();
  // get piles from redux
  const { deckPile, translationX, translationY } = useSelector(
    ({ Deck }: RootReducerState) => ({
      deckPile: Deck.deckPile,
      translationX: Deck.translationX,
      translationY: Deck.translationY
    })
  );

  // swap from deck to flipped pile
  const handleDeckSwap = async (cardId: number) => {
    // wait for the css animation to end
    setTimeout(() => {
      dispatch(deckActions.flipDeckPile(cardId));
    }, 600);
  };

  // renders cards components that can be flipped (with translation)
  const getCards = () => {
    const cardsArray = deckPile.map((card: CardType) => (
      <CardFlippable
        key={`deck_${card.id}`}
        image={card.image}
        zIndex={999}
        removeCard={() => handleDeckSwap(card.id)}
        translationX={translationX}
        translationY={translationY}
      />
    ));
    return cardsArray;
  };

  // return a pile of cards to be flipped
  return (
    <SimplePile
      pileId="deckPile"
      getCards={getCards}
      offset={2}
      pileClassName="deckPile"
      insideClassName="cardPile"
    />
  );
}

export default memo(forwardRef(DeckPile));
