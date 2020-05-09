import { CardFrame, CardSpot } from "../Cards/Cards.items";
import React, { forwardRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import { RootReducerState } from "../../../global";
import columnActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";

const FlippedPile = () => {
  const dispatch = useDispatch();
  // get piles from redux
  const { flippedRef, flippedPile, cardDragging } = useSelector(
    ({ Deck }: RootReducerState) => ({
      flippedRef: Deck.flippedRef,
      flippedPile: Deck.flippedPile,
      cardDragging: Deck.cardDragging
    })
  );

  const onGrab = (e: any) => {
    const position = e.currentTarget.getBoundingClientRect();
    dispatch(deckActions.removeFlippedCard(position));

    /*  dispatch(
      columnActions.setCardDragging(1, "flipped", {
        x: position.x,
        y: position.y
      })
    ); */
  };

  const getCards = () => {
    const cardsArray = flippedPile.map((card: CardType) => (
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
    ));
    /* cardsArray.push(
      <CardSpot
        cardId={-1}
        ref={flippedRef}
        key="flipped_spot"
        withColumn={false}
        isFlipped
      />
    ); */
    return cardsArray;
  };

  return (
    <Col className="cardPile" span={3}>
      <div className="cardPileContainer">{getCards()}</div>
    </Col>
  );
};

export default memo(forwardRef(FlippedPile));
