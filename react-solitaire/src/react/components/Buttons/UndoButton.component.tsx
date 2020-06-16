import React from "react";
import { StepBackwardOutlined } from "@ant-design/icons";
// import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
// import { useDispatch } from "react-redux";

/**
 * Option to undo a game move
 */
function UndoButton() {
  // const dispatch = useDispatch();
  // eslint-disable-next-line no-console
  return <StepBackwardOutlined onClick={() => console.log("UNDO ACTION")} />;
}
export default UndoButton;
