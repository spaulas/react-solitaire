/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import Draggable from "react-draggable";
import { RootReducerState } from "../../../global";
import columnActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";

function DraggablePile() {
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

    return `column${columnNumber || 1}Pile`;
  };

  const onDrop = (e: MouseEvent) => {
    const columnDropedTo = getColumnToDrop(e);
    if (isDeck) {
      dispatch(columnActions.addToColumn(cardDragging, columnDropedTo, 1));
    } else {
      dispatch(columnActions.swapColumns(columnDropedTo, 1));
      dispatch(columnActions.removeCardDragging());
    }
  };

  useEffect(() => {
    if (sendBack) {
      dispatch(deckActions.restoreFlippedCard());
    }
    dispatch(deckActions.resetCardDragging());
  }, [sendBack]);

  const getCards = () => {
    console.log("cardDragging NEW COMPONENT -  = ", cardDragging);
    const cardsArray = cardDragging.map((card: CardType, index: number) => {
      return (
        <div
          key={`cardframedraggable_${card.id}`}
          className="cardContainer cardContainerColumns"
        >
          <div className="cardAspectRatio">
            <div className="cardContent">
              <div className="cardDefault">
                <img
                  className="cardImage"
                  src={require(`../../../images/CardsFaces/${card.image}`)}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
    return cardsArray;
  };
  return (
    <div
      className={`draggableCard ${cardDragging ? "draggableCardActive" : ""}`}
    >
      {cardDragging && (
        <Draggable
          defaultPosition={cardDraggingPosition}
          onStop={(e: any) => onDrop(e)}
        >
          <Col span={3} className="deckPile">
            <div className="columnPile">
              <div className="cardPileContainer">{getCards()}</div>
            </div>
          </Col>
        </Draggable>
      )}
    </div>
  );
}

export default DraggablePile;
