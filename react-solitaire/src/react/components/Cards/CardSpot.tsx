import CardFrame from "./CardFrame";
import React from "react";

function CardSpot({ offset }: { offset?: number }) {
  return <CardFrame offset={offset} className="cardSpot" />;
}

export default CardSpot;
