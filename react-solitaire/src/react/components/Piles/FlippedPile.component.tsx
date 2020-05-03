import { CardFrame, CardSpot } from "../Cards/Cards.items";
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

  const getCards = () => {
    const cardsArray = flippedPile.map((card: CardsPile) => (
      <CardFrame key={`flipped_${card.id}`}>
        <div className="cardDefault">
          <img className="cardImage" src={playCardImage} alt="" />
        </div>
      </CardFrame>
    ));
    cardsArray.push(
      <CardSpot ref={flippedRef} key="flipped_spot" withColumn={false} />
    );
    return cardsArray;
  };

  return (
    <Col className="cardPile" span={3}>
      <div className="cardPileContainer">{getCards()}</div>
    </Col>
  );
};

export default memo(forwardRef(FlippedPile));
