import React, { forwardRef, memo } from "react";
import { RefAny, RootReducerState } from "../../../global";
import { useDispatch, useSelector } from "react-redux";
import { CardFrame /* CardSpot */ } from "../Cards/Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import DraggableCard from "../Cards/DraggableCard.component";
/* import columnActions from "../../../redux/columns/columns.actions"; */
import deckActions from "../../../redux/deck/deck.actions";

const FlippedPile = () => {
  const dispatch = useDispatch();
  // get piles from redux
  const { flippedPile /* cardDragging */ } = useSelector(
    ({ Deck }: RootReducerState) => ({
      flippedPile: Deck.flippedPile,
      cardDragging: Deck.cardDragging
    })
  );

  const onGrab = (e: RefAny) => {
    dispatch(deckActions.dragFlippedCard());

    /*  dispatch(
      columnActions.setCardDragging(1, "flipped", {
        x: position.x,
        y: position.y
      })
    ); */
  };

  const getCards = () => {
    const cardsArray = flippedPile.map((card: CardType) => (
      <DraggableCard card={card} nCards={1} key={card.id}>
        <CardFrame
          onGrab={onGrab}
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
