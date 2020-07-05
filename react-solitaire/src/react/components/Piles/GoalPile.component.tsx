import React, { forwardRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import DoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/DoubleClickHandler.component";
import { DraggableCard } from "../Cards/Cards.items";
import GoalDoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/GoalDoubleClickHandler";
import { RootReducerState } from "../../../global";
import SimplePile from "./SimplePile.component";

interface GoalPileProps {
  goalId: string;
  offset?: number;
}

/**
 * Component that consists of a pile (3d) of flipped cards that can be dragged
 */
function GoalPile({ goalId, offset }: GoalPileProps) {
  const dispatch = useDispatch();
  // get piles from redux
  const { goalPile, lastHint } = useSelector(
    ({ Goal, GameBoard }: RootReducerState) => {
      const gameHints = GameBoard.gameHints;
      const lastIndex = gameHints.length - 1;
      return {
        goalPile: Goal.goals[goalId],
        lastHint: lastIndex >= 0 ? gameHints[lastIndex] : undefined
      };
    }
  );

  // renders cards components that can be dragged
  const getCards = () => {
    const cardsArray = goalPile.map((card: CardType) => {
      const handler = new GoalDoubleClickHandler(dispatch, goalId, card);

      const shake =
        lastHint &&
        (card.cardField === lastHint.source ||
          card.cardField === lastHint.target);
      return (
        <DoubleClickHandler key={card.id} handler={handler} doubleClick>
          <DraggableCard card={card} nCards={1} shake={shake} />
        </DoubleClickHandler>
      );
    });
    return cardsArray;
  };

  // return a pile of flipped cards
  return (
    <SimplePile
      offset={offset}
      pileId={goalId}
      pileCards={getCards()}
      pileClassName="deckPile flippedPile"
      insideClassName="columnPile"
    />
  );
}

export default memo(forwardRef(GoalPile));
