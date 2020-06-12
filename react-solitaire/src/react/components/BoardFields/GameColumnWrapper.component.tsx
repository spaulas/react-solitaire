/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import ColumnPile from "../Piles/ColumnPile.component";
import React from "react";
import { RootReducerState } from "../../../global";
import { Row } from "antd";
import { useSelector } from "react-redux";

function GameColumnWrapper() {
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
    }
  } = useSelector(({ Columns }: RootReducerState) => ({
    columns: Columns.columns
  }));

  return (
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
  );
}

export default GameColumnWrapper;
