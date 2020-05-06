import { CardFrame, CardSpot } from "../Cards/Cards.items";
import React, { forwardRef, memo } from "react";
import { CardsPile } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import { RootReducerState } from "../../../global";
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
      <CardFrame
        key={`flipped_${card.id}`}
        cardId={card.id}
        zIndex={5}
        isFlipped
      >
        <div className="cardDefault">
          <img
            className="cardImage"
            src={require(`../../../images/CardsFaces/${card.image}`)}
            alt=""
          />
        </div>
      </CardFrame>
    ));
    cardsArray.push(
      <CardSpot
        cardId={-1}
        ref={flippedRef}
        key="flipped_spot"
        withColumn={false}
        isFlipped
      />
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
