/* eslint-disable react/no-multi-comp */
import React, { forwardRef, memo } from "react";
import { RefAny, RootReducerState } from "../../../../global";
import { CardFlippable } from "../CardsItems";
import CardSpot from "../CardSpot";
import { CardsPile } from "../../../../redux/deck/deck.types";
import { Col } from "antd";
import { useSelector } from "react-redux";

const FlippedPile = (props: RefAny, ref: RefAny) => {
  // get piles from redux
  const { deckPile, translation, topFlipped } = useSelector(
    ({ Deck }: RootReducerState) => ({
      deckPile: Deck.deckPile,
      topFlipped: Deck.topFlipped,
      translation: Deck.translation
    })
  );

  const printCard = (index: number) => {
    return <CardFlippable key={`flipped${index}`} ref={ref} />;
  };

  const getTopCard = () => {
    return topFlipped ? printCard(topFlipped) : null;
  };

  const getBottomCards = () => {
    const bottomCardsArray = deckPile.map(
      (card: CardsPile) =>
        card.id !== topFlipped &&
        card.cardType === "flipped" &&
        printCard(card.id)
    );
    bottomCardsArray.push(<CardSpot />);
    return bottomCardsArray;
  };

  return (
    <Col className="cardPile" span={3} offset={2}>
      <div className="cardPileContainerTop">{getTopCard()}</div>
      <div className="cardPileContainerBottom">{getBottomCards()}</div>
    </Col>
  );
};

export default memo(forwardRef(FlippedPile));
