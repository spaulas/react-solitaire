/* eslint-disable no-console */
import {
  CardFlippable,
  CardFrame /* , CardSpot */
} from "../Cards/Cards.items";
import { CardsPile } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import React from "react";
import columnActions from "../../../redux/columns/columns.actions";
import { getColumnToDrop } from "../Cards/Cards.utils";
import { useDispatch } from "react-redux";

interface ColumnPileProps {
  offset?: number;
  columnCards: Array<CardsPile>;
  columnId: string;
}

function ColumnPile({ offset, columnCards, columnId }: ColumnPileProps) {
  const dispatch = useDispatch();

  const onDrop = (e: MouseEvent) => {
    const columnDropedTo = getColumnToDrop(e);
    if (columnDropedTo !== columnId) {
      dispatch(columnActions.swapColumns(columnId, columnDropedTo, 1));
    }
  };

  const getCards = () => {
    const cardsArray = columnCards.map((card: CardsPile) => {
      if (card.flipped) {
        return (
          <CardFrame
            cardId={card.id}
            onDrop={onDrop}
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
