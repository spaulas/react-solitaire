import { ExplicitAny, RootReducerState } from "../../../../global";
import React, {
  Children,
  PropsWithChildren,
  cloneElement,
  memo,
  useEffect,
  useState
} from "react";
import { useSelector } from "react-redux";

interface DoubleClickHandlerProps {
  handler: ExplicitAny;
  doubleClick: boolean;
}

/**
 * Component that handles the flow of a double click
 */
function DoubleClickHandler({
  handler,
  doubleClick,
  children
}: PropsWithChildren<DoubleClickHandlerProps>) {
  const [handlingMove, setHandlingMove] = useState<boolean>();

  const {
    goalMoveTarget,
    columnMoveTarget,
    columnMoveCards,
    movementWithFlip,
    hintSource,
    columns
  } = useSelector(({ Goal, Columns }: RootReducerState) => ({
    goalMoveTarget: Goal.doubleClickTarget,
    columnMoveTarget: Columns.doubleClickTarget,
    columnMoveCards: Columns.movingCards,
    columns: Columns.columns,
    movementWithFlip: Columns.movementWithFlip,
    hintSource: Goal.hintSource || Columns.hintSource
  }));

  // call the first handler of the double click when the handling move changes to true
  const handleDoubleClick = () => {
    setHandlingMove(true);
    handler.handleDoubleClick();
  };

  // if the columnTarget changed, call the function which deals with it
  const handleColumnDoubleClickResult = () => {
    if (handlingMove) {
      const result = handler.handleColumnDoubleClickResult(
        columnMoveTarget,
        columnMoveCards,
        movementWithFlip,
        doubleClick ? undefined : hintSource
      );
      if (result) {
        setHandlingMove(false);
      }
    }
  };
  useEffect(handleColumnDoubleClickResult, [columnMoveTarget]);

  // if the goalMoveTarget changed, call the function which deals with it
  const handleGoalDoubleClickResult = () => {
    if (handlingMove) {
      const result = handler.handleGoalDoubleClickResult(
        goalMoveTarget,
        doubleClick ? movementWithFlip : hintSource,
        columns
      );
      if (result) {
        setHandlingMove(false);
      }
    }
  };
  useEffect(handleGoalDoubleClickResult, [goalMoveTarget]);

  return (
    <>
      {Children.map(children, (child: ExplicitAny) => {
        return cloneElement(child, {
          [doubleClick ? "onDoubleClick" : "onClick"]: () => handleDoubleClick()
        });
      })}
    </>
  );
}

export default memo(DoubleClickHandler);
