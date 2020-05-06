/* eslint-disable no-console */
import {
  CardFlippable,
  CardFrame /* , CardSpot */
} from "../Cards/Cards.items";
import { CardsPile } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import React from "react";

interface ColumnPileProps {
  offset?: number;
  columnCards: Array<CardsPile>;
}

function ColumnPile({ offset, columnCards }: ColumnPileProps) {
  const getCards = () => {
    const cardsArray = columnCards.map((card: CardsPile) => {
      if (card.flipped) {
        return (
          <CardFrame
            cardContainerClassName="cardContainerColumns"
            key={`flipped_${card.id}`}
            zIndex={999}
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
        );
      }

      return (
        <CardFlippable
          disabled={true}
          className="cardContainerColumns"
          key={`columnPile_${card.id}`}
          image={card.image}
          zIndex={999}
        />
      );
    });

    /* cardsArray.push(
      <CardSpot
        cardContainerColumns="cardContainerSpot"
        key="column_spot"
        withColumn={false}
      />
    ); */
    return cardsArray;
  };
  return (
    <Col span={3} offset={offset} className="deckPile">
      <div className="columnPile">
        <div className="cardPileContainer">{getCards()}</div>
      </div>
    </Col>
  );
}

export default ColumnPile;
