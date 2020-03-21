import CardFrame from "./CardFrame";
import React from "react";
import backgroundImage from "../../../images/CardsBackPatterns/flowers.png";

function CardBack({ offset }: { offset?: number }) {
  return (
    <CardFrame offset={offset} className="cardBack">
      <img className="cardImage" src={backgroundImage} alt="" />
    </CardFrame>
  );
}

export default CardBack;
