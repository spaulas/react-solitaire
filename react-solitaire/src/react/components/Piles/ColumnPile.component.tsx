import { CardFlippable, DraggableCard } from "../Cards/Cards.items";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import ColumDoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/ColumnDoubleClickHandler";
import DoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/DoubleClickHandler.component";
import { RootReducerState } from "../../../global";
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
  const dispatch = useDispatch();

  const { lastHint } = useSelector(({ GameBoard }: RootReducerState) => {
    const gameHints = GameBoard.gameHints;
    const lastIndex = gameHints.length - 1;
    return {
      lastHint: lastIndex >= 0 ? gameHints[lastIndex] : undefined
    };
  });

  // renders cards components accordingly if it is flipped or not
  const getCards = () => {
    const cardsArray = columnCards.map((card: CardType, index: number) => {
      // if the card is flipped, then the card image is shown and it can be dragged
      if (card.flipped) {
        const nCards = columnCards.length - index;
        const handler = new ColumDoubleClickHandler(
          dispatch,
          columnId,
          card,
          nCards
        );
        const shake =
          lastHint &&
          (card.cardField === lastHint.source ||
            card.cardField === lastHint.target);

        return (
          <DoubleClickHandler handler={handler} doubleClick>
            <DraggableCard
              card={card}
              nCards={nCards}
              index={index}
              shake={shake}
            />
          </DoubleClickHandler>
        );
      }

      // if it is not flipped, then the card can be flipped (but this flip is made automatically, when there are no more cards over it)
      return (
        <CardFlippable
          disabled={true}
          className={`${index > 0 ? "cardContainerColumns" : ""}`}
          key={`${columnId}_flippable_${card.id}`}
          image={card.image}
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
