import React from "react";
import { StepForwardOutlined } from "@ant-design/icons";
// import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
// import { useDispatch } from "react-redux";

/**
 * Option to undo a game move
 */
function RedoButton() {
  // const dispatch = useDispatch();
  // eslint-disable-next-line no-console
  return <StepForwardOutlined onClick={() => console.log("REDO ACTION")} />;
}
export default RedoButton;
