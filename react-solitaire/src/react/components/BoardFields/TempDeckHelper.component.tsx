import CustomDragLayer from "../Cards/CustomDragLayer.component";
import { GameTopRow } from "../../components/BoardFields/BoardFields.items";
import React from "react";

const TempDeckHelper = () => {
  return (
    <div>
      <GameTopRow />
      <CustomDragLayer />
    </div>
  );
};

export default TempDeckHelper;
