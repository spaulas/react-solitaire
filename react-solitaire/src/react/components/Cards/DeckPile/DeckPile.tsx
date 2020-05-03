/* eslint-disable no-console */
/* eslint-disable react/no-multi-comp */
import { CardFlippable, CardSpot } from "../CardsItems";
import React, { forwardRef, memo } from "react";
import { RefAny, RootReducerState } from "../../../../global";
import { useDispatch, useSelector } from "react-redux";
import { CardsPile } from "../../../../redux/deck/deck.types";
import { Col } from "antd";
import deckActions from "../../../../redux/deck/deck.actions";

const DeckPile = (props: RefAny, ref: RefAny) => {
  const dispatch = useDispatch();
  // get piles from redux
  const { deckPile, translation } = useSelector(
    ({ Deck }: RootReducerState) => ({
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

  const printCard = (index: number) => {
    return (
      <CardFlippable
        key={`deck_${index}`}
        removeCard={() => handleDeckSwap(index)}
        translation={translation}
      />
    );
  };

  const getBottomCards = () => {
    const bottomCardsArray = deckPile.map((card: CardsPile) =>
      printCard(card.id)
    );
    bottomCardsArray.push(
      <CardSpot ref={ref} key="deck_spot" withColumn={false} />
    );
    return bottomCardsArray;
  };

  return (
    <Col span={3} offset={2}>
      <div className="cardPile">
        <div className="cardPileContainerBottom">{getBottomCards()}</div>
      </div>
    </Col>
  );
};

export default memo(forwardRef(DeckPile));
