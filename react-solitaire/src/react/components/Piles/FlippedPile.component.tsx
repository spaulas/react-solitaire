import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import DeckDoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/DeckDoubleClickHandler";
import DraggableClickableCard from "../CardMoveHandlers/DoubleClickHandlers/DoubleClickHandler.component";
import { RootReducerState } from "../../../global";
import SimplePile from "./SimplePile.component";

/**
 * Component that consists of a pile (3d) of flipped cards that can be dragged
 */
function FlippedPile() {
  const dispatch = useDispatch();
  // get piles from redux
  const { flippedPile } = useSelector(({ Deck }: RootReducerState) => ({
    flippedPile: Deck.flippedPile
  }));

  const getCards = () => {
    return flippedPile.map((card: CardType) => {
      const handler = new DeckDoubleClickHandler(dispatch, card);
      return (
        <DraggableClickableCard handler={handler} key={card.id} card={card} />
      );
    });
  };

  // return a pile of flipped cards
  return (
    <SimplePile
      pileId="flippedPile"
      pileCards={getCards()}
      pileClassName="deckPile flippedPile"
      insideClassName="columnPile"
    />
  );
}

export default memo(FlippedPile);
