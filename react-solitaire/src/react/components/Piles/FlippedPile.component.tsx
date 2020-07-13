import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardImage from "../Cards/CardImage.component";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import DeckDoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/DeckDoubleClickHandler";
import DoubleClickHandler from "../CardMoveHandlers/DoubleClickHandlers/DoubleClickHandler.component";
import { DraggableCard } from "../Cards/Cards.items";
import { RootReducerState } from "../../../global";
import SimplePile from "./SimplePile.component";

/**
 * Component that consists of a pile (3d) of flipped cards that can be dragged
 */
function FlippedPile() {
  const dispatch = useDispatch();
  // get piles from redux
  const {
    flippedPile,
    lastHint,
    startBackAnimation,
    translationX,
    translationY
  } = useSelector(({ Deck, GameBoard }: RootReducerState) => {
    const gameHints = GameBoard.gameHints;
    const lastIndex = gameHints.length - 1;
    return {
      flippedPile: Deck.flippedPile,
      lastHint: lastIndex >= 0 ? gameHints[lastIndex] : undefined,
      startBackAnimation: Deck.startBackAnimation,
      translationX: -Deck.translationX,
      translationY: -Deck.translationY - 1
    };
  });

  const animationStyle = {
    transform: `translate(${translationX}px, ${translationY}px) rotateY(180deg)`
  };

  const getCards = () => {
    return flippedPile.map((card: CardType, index: number) => {
      const handler = new DeckDoubleClickHandler(dispatch, card);
      const shake = lastHint && lastHint.source === "flippedPile";
      return (
        <DoubleClickHandler key={card.id} handler={handler} doubleClick>
          <DraggableCard card={card} nCards={1} shake={shake}>
            <div
              className="cardFlipContainer"
              // eslint-disable-next-line react/forbid-dom-props
              style={
                startBackAnimation && index === flippedPile.length - 1
                  ? animationStyle
                  : {}
              }
            >
              <CardImage
                directory="CardsBackPatterns"
                additionalClassName="cardFlipFront"
              />
              <CardImage
                image={card.image}
                directory="CardsFaces"
                additionalClassName="cardFlipBack"
              />
            </div>
          </DraggableCard>
        </DoubleClickHandler>
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
