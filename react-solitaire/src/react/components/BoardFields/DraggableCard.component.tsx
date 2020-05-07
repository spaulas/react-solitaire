/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardFrame } from "../Cards/Cards.items";
import { CardsPile } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import { RootReducerState } from "../../../global";
import columnActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";

const DraggableCard = () => {
  const dispatch = useDispatch();
  const { cardDragging, cardDraggingPosition, isDeck, sendBack } = useSelector(
    ({ Columns, Deck }: RootReducerState) => ({
      isDeck: !!Deck.cardDragging,
      sendBack: Columns.sendBack,
      cardDragging: Columns.cardDragging || Deck.cardDragging,
      cardDraggingPosition:
        Columns.cardDraggingPosition || Deck.cardDraggingPosition
    })
  );

  // then do one for the 4 top goal spaces (the function called will depend on the y axis)
  const getColumnToDrop = ({ x, view }: MouseEvent) => {
    const innerWidth = view?.innerWidth || 1080;

    const columnSizes = innerWidth / 7;
    const columnNumber = Math.ceil(x / columnSizes);

    console.log("onDrop innerWidth = ", innerWidth);
    console.log("onDrop columnSizes = ", columnSizes);
    console.log("onDrop columnNumber = ", columnNumber);

    return `column${columnNumber || 1}Pile`;
  };

  const onDrop = (e: MouseEvent) => {
    const columnDropedTo = getColumnToDrop(e);
    console.log("onDrop columnDropedTo = ", columnDropedTo);
    console.log("onDrop cardDragging = ", cardDragging);
    console.log("onDrop isDeck = ", isDeck);
    if (isDeck) {
      dispatch(columnActions.addToColumn(cardDragging, columnDropedTo, 1));
    } else {
      dispatch(columnActions.swapColumns(columnDropedTo, 1));
      dispatch(columnActions.removeCardDragging());
    }
  };

  useEffect(() => {
    if (sendBack) {
      dispatch(deckActions.addFlippedCard());
    }
    dispatch(deckActions.removeCardDragging());
  }, [sendBack]);
  return (
    <div
      className={`draggableCard ${cardDragging ? "draggableCardActive" : ""}`}
    >
      <Col span={3} className="deckPile">
        <div className="columnPile">
          <div className="cardPileContainer">
            {cardDragging &&
              cardDragging.map((card: CardsPile) => (
                <CardFrame
                  defaultPosition={cardDraggingPosition}
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
              ))}
          </div>
        </div>
      </Col>
    </div>
  );
};

export default DraggableCard;
