/* eslint-disable jest/expect-expect */
import {
  CardFlippable,
  CardFrame /* , CardSpot */
} from "../Cards/Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import DraggableCard from "../Cards/DraggableCard.component";
import React from "react";

interface ColumnPileProps {
  offset?: number;
  columnCards: Array<CardType>;
  columnId: string;
}

function ColumnPile({ offset, columnCards, columnId }: ColumnPileProps) {
  const getCards = () => {
    const cardsArray = columnCards.map((card: CardType, index: number) => {
      if (card.flipped) {
        return (
          <DraggableCard card={card} nCards={columnCards.length - index}>
            <CardFrame
              cardContainerClassName={`${
                index > 0 ? "cardContainerColumns" : ""
              }`}
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
          </DraggableCard>
        );
      }

      return (
        <CardFlippable
          disabled={true}
          className={`${index > 0 ? "cardContainerColumns" : ""}`}
          key={`columnPile_${card.id}`}
          image={card.image}
          zIndex={999}
        />
      );
    });

    return cardsArray;
  };
  return (
    <Col id={columnId} span={3} offset={offset} className="deckPile">
      <div className="columnPile">
        <div className="cardPileContainer">{getCards()}</div>
      </div>
    </Col>
  );
}

export default ColumnPile;
