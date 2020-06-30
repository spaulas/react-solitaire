/* eslint-disable no-console */
import { CardFlippable, DraggableCard } from "../Cards/Cards.items";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { RootReducerState } from "../../../global";
import SimplePile from "./SimplePile.component";
import columnsActions from "../../../redux/columns/columns.actions";
import goalActions from "../../../redux/goal/goal.actions";

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

  const { goalMoveTarget /* , columnMoveValid */ } = useSelector(
    ({ Goal, Columns }: RootReducerState) => ({
      goalMoveTarget: Goal.doubleClickTarget,
      columnMoveValid: Columns.doubleClickValid
    })
  );

  const [cardMove, setCardMove] = useState<
    { card: CardType; nCards: number } | undefined
  >();

  const doubleClick = (card: CardType, nCards: number) => {
    setCardMove({ card, nCards });
    // if only one card was clicked
    if (nCards === 1) {
      console.log("TRY GOAL");
      // then check first if it can go to a goal pile
      dispatch(goalActions.checkDoubleClickValid(card));
    } else {
      console.log("TRY COLUMN");
      // if there is more than one, then check if it can go to a column pile
      // this function handles the swap of columns as well
      dispatch(columnsActions.checkDoubleClickValid(card.cardField, nCards));
    }
  };

  const handleDoubleClickResult = () => {
    console.log("goalMoveTarget =- ", goalMoveTarget);
    if (cardMove) {
      if (!goalMoveTarget) {
        console.log("GOAL NOT SUCCESSFUL = TRY COLUMN");
        // add animation to shake the card
        dispatch(
          columnsActions.checkDoubleClickValid(
            cardMove.card.cardField,
            cardMove.nCards
          )
        );
      } else {
        console.log("GOAL SUCCESSFUL");
        // remove card from column
        dispatch(
          columnsActions.removeNCardsFromColumn(
            cardMove.card.cardField,
            1,
            true
          )
        );
        // add removed card to the corresponding goal
        dispatch(goalActions.addCardToGoal(goalMoveTarget, cardMove.card));
      }
    }
  };

  useEffect(handleDoubleClickResult, [goalMoveTarget]);

  // renders cards components accordingly if it is flipped or not
  const getCards = () => {
    const cardsArray = columnCards.map((card: CardType, index: number) => {
      // if the card is flipped, then the card image is shown and it can be dragged
      if (card.flipped) {
        const nCards = columnCards.length - index;
        return (
          <DraggableCard
            key={`${columnId}_flipped_${card.id}`}
            card={card}
            nCards={nCards}
            index={index}
            onDoubleClick={() => doubleClick(card, nCards)}
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
