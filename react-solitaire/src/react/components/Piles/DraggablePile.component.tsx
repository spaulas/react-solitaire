import React, { useEffect, useState } from "react";
import { RefAny, RootReducerState } from "../../../global";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import Draggable from "react-draggable";
import _debounce from "lodash.debounce";
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

  const [columnScaled, setColumnScaled] = useState("");

  useEffect(() => {
    // debounce assures that the function is only called once every 100 ms
    const handleMouseMove = _debounce((e: MouseEvent) => {
      if (cardDragging) {
        const columnId = getColumnToDrop(e);

        if (columnId !== columnScaled) {
          if (columnScaled !== "") {
            const previous = document.getElementById(columnScaled);
            previous?.setAttribute(
              "style",
              "transition: transform 0.2s; transform: scale(1);"
            );
            const column = document.getElementById(columnId);
            column?.setAttribute(
              "style",
              "transition: transform 0.2s; transform: scale(1.02);"
            );
          }

          setColumnScaled(columnId);
        }
      }
    }, 20);

    // add event listener for the window
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // remove event listener when the component is unmounted
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  // then do one for the 4 top goal spaces (the function called will depend on the y axis)
  const getColumnToDrop = ({ x, view }: MouseEvent) => {
    const innerWidth = view?.innerWidth || 1080;

    const columnSizes = innerWidth / 7;
    const columnNumber = Math.ceil((x || 1) / columnSizes);

    return `column${columnNumber || 1}Pile`;
  };

  const onDrop = (e: MouseEvent) => {
    const columnDropedTo = getColumnToDrop(e);
    const finalColumn = document.getElementById(columnDropedTo);
    finalColumn?.setAttribute(
      "style",
      "transition: transform 0.2s; transform: scale(1);"
    );
    setColumnScaled("");
    if (isDeck) {
      dispatch(
        columnActions.addDraggingCardsToColumn(cardDragging, columnDropedTo)
      );
    } else {
      dispatch(columnActions.swapColumns(columnDropedTo, 1));
      dispatch(columnActions.resetCardDragging());
    }
  };

  useEffect(() => {
    if (sendBack) {
      dispatch(deckActions.restoreFlippedCard());
    }
    dispatch(deckActions.resetCardDragging());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendBack]);

  const getCards = () => {
    const cardsArray = cardDragging.map((
      card: CardType /*  index: number */
    ) => {
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
    <div className="draggableCard">
      {cardDragging && (
        <Draggable
          defaultPosition={cardDraggingPosition}
          onStop={(e: RefAny) => onDrop(e)}
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
