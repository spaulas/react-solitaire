import React, { forwardRef, memo } from "react";
import CardFrame from "./CardFrame";
import { RefAny } from "../../../global";

function CardSpot({ offset }: { offset?: number }, ref: RefAny) {
  return <CardFrame ref={ref} offset={offset} className="cardSpot" />;
}

export default memo(forwardRef(CardSpot));
