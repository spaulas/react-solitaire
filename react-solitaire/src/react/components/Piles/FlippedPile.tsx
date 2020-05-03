/* eslint-disable react/no-multi-comp */
import { CardFrame, CardSpot } from "../Cards/CardsItems";
import React, { forwardRef, memo } from "react";
import { CardsPile } from "../../../redux/deck/deck.types";
import { Col } from "antd";
import { RootReducerState } from "../../../global";
import playCardImage from "../../../images/CardsFaces/Hearts/hearts12.png";
import { useSelector } from "react-redux";

const FlippedPile = () => {
  // get piles from redux
  const { flippedRef, flippedPile } = useSelector(
    ({ Deck }: RootReducerState) => ({
      flippedRef: Deck.flippedRef,
      flippedPile: Deck.flippedPile
    })
  );

  const printCard = (index: number) => {
    return (
      <CardFrame key={`flipped${index}`}>
        <div className="cardDefault">
          <img className="cardImage" src={playCardImage} alt="" />
        </div>
      </CardFrame>
    );
  };

  const getBottomCards = () => {
    const bottomCardsArray = flippedPile.map((card: CardsPile) =>
      printCard(card.id)
    );
    bottomCardsArray.push(
      <CardSpot ref={flippedRef} key="flipped_spot" withColumn={false} />
    );
    return bottomCardsArray;
  };

  return (
    <Col className="cardPile" span={3}>
      <div className="cardPileContainerBottom">{getBottomCards()}</div>
    </Col>
  );
};

export default memo(forwardRef(FlippedPile));
