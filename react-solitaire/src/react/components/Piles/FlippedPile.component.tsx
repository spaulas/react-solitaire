import React, { forwardRef, memo } from "react";
import { CardFrame } from "../Cards/Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import DraggableCard from "../Cards/DraggableCard.component";
import { RootReducerState } from "../../../global";
import { useSelector } from "react-redux";

const FlippedPile = () => {
  // get piles from redux
  const { flippedPile /* cardDragging */ } = useSelector(
    ({ Deck }: RootReducerState) => ({
      flippedPile: Deck.flippedPile,
      cardDragging: Deck.cardDragging
    })
  );

  const getCards = () => {
    const cardsArray = flippedPile.map((card: CardType) => (
      <DraggableCard card={card} nCards={1} key={card.id}>
        <CardFrame key={`flipped_${card.id}`} zIndex={5} isFlipped>
          <div className="cardDefault">
            <img
              className="cardImage"
              src={require(`../../../images/CardsFaces/${card.image}`)}
              alt=""
            />
          </div>
        </CardFrame>
      </DraggableCard>
    ));
    return cardsArray;
  };

  return (
    <Col className="cardPile" span={3}>
      <div className="cardPileContainer">{getCards()}</div>
    </Col>
  );
};

export default memo(forwardRef(FlippedPile));
