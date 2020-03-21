/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable react/no-multi-comp */
import React, { forwardRef, memo } from "react";
import CardFlippable from "./CardFlippable";
import CardSpot from "./CardSpot";
import { Col } from "antd";
import { RefAny } from "../../../global";

export interface CardInfo {
  cardType: string;
  translation?: number;
}

interface CardsPileProps {
  offset?: number;
  cardsArray?: Array<CardInfo>;
  handleCardSwap?: (card: CardInfo) => void;
}

function CardsPile(
  {
    offset,
    cardsArray = [{ cardType: "spot" }],
    handleCardSwap
  }: CardsPileProps,
  ref: RefAny
) {
  const removeCard = (card: CardInfo) => {
    if (handleCardSwap) {
      handleCardSwap(card);
    }
  };

  const printCard = (index: number) => {
    const card: CardInfo = cardsArray[index];
    console.log("PRINT card = ", card);
    switch (card?.cardType) {
      case "spot":
        return <CardSpot ref={ref} />;
      case "deck":
        return (
          <CardFlippable
            ref={ref}
            // eslint-disable-next-line no-console
            removeCard={() => removeCard(card)}
            translation={card.translation}
          />
        );
      default:
        return <CardFlippable ref={ref} />;
    }
  };

  const getTopCard = () => {
    const topIndex = cardsArray.length - 1;
    return printCard(topIndex);
  };

  const getBottomCard = () => {
    const bottomIndex = cardsArray.length - 2;
    if (bottomIndex >= 0) {
      return printCard(bottomIndex);
    }
    return null;
  };

  return (
    <Col className="cardPile" span={3} offset={offset}>
      <div className="cardPileContainerTop">{getTopCard()}</div>
      <div className="cardPileContainerBottom">{getBottomCard()}</div>
    </Col>
  );
}

export default memo(forwardRef(CardsPile));
