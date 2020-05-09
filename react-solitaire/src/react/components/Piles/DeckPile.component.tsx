import React, { forwardRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardFlippable /* CardSpot */ } from "../Cards/Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import { RootReducerState } from "../../../global";
import deckActions from "../../../redux/deck/deck.actions";

const DeckPile = () => {
  const dispatch = useDispatch();
  // get piles from redux
  const { /* deckRef */ deckPile, translationX, translationY } = useSelector(
    ({ Deck }: RootReducerState) => ({
      deckRef: Deck.deckRef,
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

  const getCards = () => {
    const cardsArray = deckPile.map((card: CardType) => (
      <CardFlippable
        cardId={card.id}
        key={`deck_${card.id}`}
        image={card.image}
        zIndex={999}
        removeCard={() => handleDeckSwap(card.id)}
        translationX={translationX}
        translationY={translationY}
      />
    ));
    /* cardsArray.push(
      <CardSpot cardId={-1} ref={deckRef} key="deck_spot" withColumn={false} />
    ); */
    return cardsArray;
  };

  return (
    <Col span={3} offset={2} className="deckPile">
      <div className="cardPile">
        <div className="cardPileContainer">{getCards()}</div>
      </div>
    </Col>
  );
};

export default memo(forwardRef(DeckPile));
