/* eslint-disable no-console */
import { useDispatch, useSelector } from "react-redux";
import { CardFrame } from "../Cards/Cards.items";
import { CardsPile } from "../../../redux/gameBoard/gameBoard.types";
import React from "react";
import { RootReducerState } from "../../../global";
import columnActions from "../../../redux/columns/columns.actions";

const DraggableCard = () => {
  const dispatch = useDispatch();
  const { cardDragging, cardDraggingPosition } = useSelector(
    ({ Columns }: RootReducerState) => ({
      cardDragging: Columns.cardDragging,
      cardDraggingPosition: Columns.cardDraggingPosition
    })
  );

  // then do one for the 4 top goal spaces (the function called will depend on the y axis)
  const getColumnToDrop = ({ x, view }: MouseEvent) => {
    const innerWidth = view?.innerWidth || 1080;

    const columnSizes = innerWidth / 7;
    const columnNumber = Math.ceil(x / columnSizes);

    return `column${columnNumber}Pile`;
  };

  const onDrop = (e: MouseEvent) => {
    const columnDropedTo = getColumnToDrop(e);
    dispatch(columnActions.swapColumns(columnDropedTo, 1));
    dispatch(columnActions.removeCardDragging());
  };

  return (
    <div
      className={`draggableCard ${cardDragging ? "draggableCardActive" : ""}`}
    >
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
  );
};

export default DraggableCard;
