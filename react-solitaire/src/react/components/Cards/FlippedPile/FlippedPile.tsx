/* eslint-disable react/no-multi-comp */
import React, { forwardRef, memo } from "react";
import { RefAny, RootReducerState } from "../../../../global";
import { CardFrame } from "../CardsItems";
import CardSpot from "../CardSpot";
import { CardsPile } from "../../../../redux/deck/deck.types";
import { Col } from "antd";
import playCardImage from "../../../../images/CardsFaces/Hearts/hearts12.png";
import { useSelector } from "react-redux";

const FlippedPile = (props: RefAny, ref: RefAny) => {
  // get piles from redux
  const { deckPile, translation } = useSelector(
    ({ Deck }: RootReducerState) => ({
      deckPile: Deck.deckPile,
      translation: Deck.translation
    })
  );

  const printCard = (index: number) => {
    return (
      <CardFrame key={`flipped${index}`} ref={ref}>
        <div className="cardDefault">
          <img className="cardImage" src={playCardImage} alt="" />
        </div>
      </CardFrame>
    );
  };

  const getBottomCards = () => {
    const bottomCardsArray = deckPile.map(
      (card: CardsPile) => card.cardType === "flipped" && printCard(card.id)
    );
    bottomCardsArray.push(<CardSpot key="flipped_spot" withColumn={false} />);
    return bottomCardsArray;
  };

  return (
    <Col className="cardPile" span={3}>
      <div className="cardPileContainerBottom">{getBottomCards()}</div>
    </Col>
  );
};

export default memo(forwardRef(FlippedPile));
