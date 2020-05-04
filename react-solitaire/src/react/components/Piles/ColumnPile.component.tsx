import { CardSpot } from "../Cards/Cards.items";
import React from "react";

function ColumnPile({ offset }: { offset?: number }) {
  return <CardSpot offset={offset} />;
}

export default ColumnPile;
