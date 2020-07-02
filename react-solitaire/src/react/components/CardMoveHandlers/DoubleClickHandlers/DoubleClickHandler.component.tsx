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
  const [handlingMove, setHandlingMove] = useState<boolean>(false);

  const {
    goalMoveTarget,
    columnMoveTarget,
    columnMoveCards,
    movementWithFlip,
    hintSource
  } = useSelector(({ Goal, Columns }: RootReducerState) => ({
    goalMoveTarget: Goal.doubleClickTarget,
    columnMoveTarget: Columns.doubleClickTarget,
    columnMoveCards: Columns.movingCards,
    movementWithFlip: Columns.movementWithFlip,
    hintSource: Goal.hintSource || Columns.hintSource
  }));

  // call the first handler of the double click when the handling move changes to true
  const handleDoubleClick = () => {
    if (handlingMove) {
      handler.handleDoubleClick();
    }
  };
  useEffect(handleDoubleClick, [handlingMove]);

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
        doubleClick ? undefined : hintSource
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
          [doubleClick ? "onDoubleClick" : "onClick"]: () =>
            setHandlingMove(true)
        });
      })}
    </>
  );
}

export default memo(DoubleClickHandler);
