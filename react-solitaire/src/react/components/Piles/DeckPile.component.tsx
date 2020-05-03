import { CardFlippable, CardSpot } from "../Cards/Cards.items";
import React, { forwardRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardsPile } from "../../../redux/deck/deck.types";
import { Col } from "antd";
import { RootReducerState } from "../../../global";
import deckActions from "../../../redux/deck/deck.actions";

const DeckPile = () => {
  const dispatch = useDispatch();
  // get piles from redux
  const { deckRef, deckPile, translation } = useSelector(
    ({ Deck }: RootReducerState) => ({
      deckRef: Deck.deckRef,
      deckPile: Deck.deckPile,
      translation: Deck.translation
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
    const cardsArray = deckPile.map((card: CardsPile) => (
      <CardFlippable
        key={`deck_${card.id}`}
        image={card.image}
        zIndex={card.id}
        removeCard={() => handleDeckSwap(card.id)}
        translation={translation}
      />
    ));
    cardsArray.push(
      <CardSpot ref={deckRef} key="deck_spot" withColumn={false} />
    );
    return cardsArray;
  };

  return (
    <Col span={3} offset={2}>
      <div className="cardPile">
        <div className="cardPileContainer">{getCards()}</div>
      </div>
    </Col>
  );
};

export default memo(forwardRef(DeckPile));
