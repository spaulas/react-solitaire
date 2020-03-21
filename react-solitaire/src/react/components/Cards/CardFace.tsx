import CardFrame from "./CardFrame";
import React from "react";
import playCardImage from "../../../images/CardsFaces/Hearts/hearts12.png";

function CardFace({ offset }: { offset?: number }) {
  return (
    <CardFrame offset={offset} className="cardBack">
      <img className="cardImage" src={playCardImage} alt="" />
    </CardFrame>
  );
}

export default CardFace;
