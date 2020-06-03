import CustomDragLayer from "../Cards/CustomDragLayer.component";
import { GameColumnWrapper } from "./BoardFields.items";
import React from "react";

const TempHelper = () => {
  return (
    <div>
      <GameColumnWrapper />
      <CustomDragLayer />
    </div>
  );
};

export default TempHelper;
