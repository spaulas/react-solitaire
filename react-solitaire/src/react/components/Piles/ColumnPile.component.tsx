import {
  CardFlippable,
  CardFrame,
  CardImage,
  DraggableCard
} from "../Cards/Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import React from "react";
import SimplePile from "./SimplePile.component";

interface ColumnPileProps {
  offset?: number; // column offset
  columnCards: Array<CardType>; // card of the column
  columnId: string; // column id
}

/**
 * Component that renders a column of cards, some are hidden and some are flipped
 */
const ColumnPile = ({ offset, columnCards, columnId }: ColumnPileProps) => {
  // renders cards components accordingly if it is flipped or not
  const getCards = () => {
    const cardsArray = columnCards.map((card: CardType, index: number) => {
      // if the card is flipped, then the card image is shown and it can be dragged
      if (card.flipped) {
        return (
          <DraggableCard card={card} nCards={columnCards.length - index}>
            <CardFrame
              cardContainerClassName={`${
                index > 0 ? "cardContainerColumns" : ""
              }`}
              key={`flipped_${card.id}`}
              zIndex={999}
              isFlipped
            >
              <CardImage directory="CardsFaces" image={card.image} />
            </CardFrame>
          </DraggableCard>
        );
      }

      // if it is not flipped, then the card can be flipped (but this flip is made automatically, when there are no more cards over it)
      return (
        <CardFlippable
          disabled={true}
          className={`${index > 0 ? "cardContainerColumns" : ""}`}
          key={`columnPile_${card.id}`}
          image={card.image}
          zIndex={999}
        />
      );
    });

    return cardsArray;
  };

  // return a pile of the flipped and unflipped cards
  return (
    <SimplePile
      pileId={columnId}
      getCards={getCards}
      offset={offset}
      pileClassName="deckPile"
      insideClassName="columnPile"
    />
  );
};

export default ColumnPile;
