import React, { memo } from "react";
import { CardFlippable } from "../Cards/Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import DraggableClickableCard from "../CardMoveHandlers/DoubleClickHandlers/ColumnDoubleClickHandler.component";
import SimplePile from "./SimplePile.component";

interface ColumnPileProps {
  offset?: number; // column offset
  columnCards: Array<CardType>; // card of the column
  columnId: string; // column id
}

/**
 * Component that renders a column of cards, some are hidden and some are flipped
 */
function ColumnPile({ offset, columnCards, columnId }: ColumnPileProps) {
  // renders cards components accordingly if it is flipped or not
  const getCards = () => {
    const cardsArray = columnCards.map((card: CardType, index: number) => {
      // if the card is flipped, then the card image is shown and it can be dragged
      if (card.flipped) {
        const nCards = columnCards.length - index;
        return (
          <DraggableClickableCard
            columnId={columnId}
            card={card}
            nCards={nCards}
            index={index}
          />
        );
      }

      // if it is not flipped, then the card can be flipped (but this flip is made automatically, when there are no more cards over it)
      return (
        <CardFlippable
          disabled={true}
          className={`${index > 0 ? "cardContainerColumns" : ""}`}
          key={`${columnId}_flippable_${card.id}`}
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
      pileCards={getCards()}
      offset={offset}
      pileClassName="deckPile"
      insideClassName="columnPile"
    />
  );
}

export default memo(ColumnPile);
