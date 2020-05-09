/* eslint-disable no-console */
import {
  CardFlippable,
  CardFrame /* , CardSpot */
} from "../Cards/Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import React from "react";
import columnActions from "../../../redux/columns/columns.actions";
import { useDispatch } from "react-redux";

interface ColumnPileProps {
  offset?: number;
  columnCards: Array<CardType>;
  columnId: string;
}

function ColumnPile({ offset, columnCards, columnId }: ColumnPileProps) {
  const dispatch = useDispatch();

  const onGrab = (e: any, index: number) => {
    const diff = columnCards.length - index;
    const position = e.currentTarget.getBoundingClientRect();
    dispatch(
      columnActions.dragColumnCards(diff, columnId, {
        x: position.x,
        y: position.y - 30
      })
    );
  };

  const getCards = () => {
    const cardsArray = columnCards.map((card: CardType, index: number) => {
      if (card.flipped) {
        return (
          <CardFrame
            cardId={card.id}
            onGrab={(e: any) => onGrab(e, index)}
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
          cardId={card.id}
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
