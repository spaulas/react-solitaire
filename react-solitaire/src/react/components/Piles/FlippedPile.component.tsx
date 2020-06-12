import { CardFrame, CardImage } from "../Cards/Cards.items";
import React, { forwardRef, memo } from "react";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import DraggableCard from "../Cards/DraggableCard.component";
import { RootReducerState } from "../../../global";
import SimplePile from "./SimplePile.component";
import { useSelector } from "react-redux";

/**
 * Component that consists of a pile (3d) of flipped cards that can be dragged
 */
function FlippedPile() {
  // get piles from redux
  const { flippedPile /* cardDragging */ } = useSelector(
    ({ Deck }: RootReducerState) => ({
      flippedPile: Deck.flippedPile,
      cardDragging: Deck.cardDragging
    })
  );

  // renders cards components that can be dragged
  const getCards = () => {
    const cardsArray = flippedPile.map((card: CardType) => (
      <DraggableCard card={card} nCards={1} key={card.id}>
        <CardFrame key={`flipped_${card.id}`} zIndex={5} isFlipped>
          <CardImage directory="CardsFaces" image={card.image} />
        </CardFrame>
      </DraggableCard>
    ));
    return cardsArray;
  };

  // return a pile of flipped cards
  return (
    <SimplePile
      pileId="flippedPile"
      getCards={getCards}
      pileClassName="cardPile"
    />
  );
}

export default memo(forwardRef(FlippedPile));
