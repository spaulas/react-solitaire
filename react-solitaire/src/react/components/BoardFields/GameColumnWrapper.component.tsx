/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useDispatch, useSelector } from "react-redux";
import ColumnPile from "../Piles/ColumnPile.component";
import React from "react";
import { RootReducerState } from "../../../global";
import { Row } from "antd";
import columnActions from "../../../redux/columns/columns.actions";
import { useDrop } from "react-dnd";

function GameColumnWrapper() {
  const dispatch = useDispatch();
  // get piles from redux
  const {
    columns: {
      column1Pile,
      column2Pile,
      column3Pile,
      column4Pile,
      column5Pile,
      column6Pile,
      column7Pile
    },
    cardDragging,
    isDeck
    // sendBack
  } = useSelector(({ Columns, Deck }: RootReducerState) => ({
    columns: Columns.columns,
    isDeck: !!Deck.cardDragging,
    sendBack: Columns.sendBack,
    cardDragging: Columns.cardDragging || Deck.cardDragging,
    cardDraggingPosition:
      Columns.cardDraggingPosition || Deck.cardDraggingPosition
  }));

  const getColumnToDrop = ({ x, y }: any) => {
    const innerWidth = window.innerWidth;

    const columnSizes = innerWidth / 7;
    const columnNumber = Math.ceil((x || 1) / columnSizes);

    return `column${columnNumber || 1}Pile`;
  };

  const onDrop = (card: any, monitor: any) => {
    const columnDropedTo = getColumnToDrop(monitor.getClientOffset());
    const finalColumn = document.getElementById(columnDropedTo);
    finalColumn?.setAttribute(
      "style",
      "transition: transform 0.2s; transform: scale(1);"
    );
    // setColumnScaled("");
    if (isDeck) {
      dispatch(
        columnActions.addDraggingCardsToColumn(cardDragging, columnDropedTo)
      );
    } else {
      dispatch(columnActions.swapColumns(columnDropedTo, 1));
      dispatch(columnActions.resetCardDragging());
    }
  };

  const [, drop] = useDrop({
    accept: "cardframe",
    drop: onDrop
  });

  return (
    <div ref={drop}>
      <Row gutter={6} className="gameColumnsRow" align="middle">
        <ColumnPile
          columnId="column1Pile"
          columnCards={column1Pile}
          offset={2}
          onMouseOver={() => null}
        />
        <ColumnPile
          columnId="column2Pile"
          columnCards={column2Pile}
          onMouseOver={() => null}
        />
        <ColumnPile
          columnId="column3Pile"
          columnCards={column3Pile}
          onMouseOver={() => null}
        />
        <ColumnPile
          columnId="column4Pile"
          columnCards={column4Pile}
          onMouseOver={() => null}
        />
        <ColumnPile
          columnId="column5Pile"
          columnCards={column5Pile}
          onMouseOver={() => null}
        />
        <ColumnPile
          columnId="column6Pile"
          columnCards={column6Pile}
          onMouseOver={() => null}
        />
        <ColumnPile
          columnId="column7Pile"
          columnCards={column7Pile}
          onMouseOver={() => null}
        />
      </Row>
    </div>
  );
}

export default GameColumnWrapper;
