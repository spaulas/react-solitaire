import React, { memo, useState } from "react";
import CardFrame from "./CardFrame";
import backgroundImage from "../../../images/CardsBackPatterns/flowers.png";
import playCardImage from "../../../images/CardsFaces/Hearts/hearts12.png";

function CardFlippable({ offset }: { offset?: number }) {
  const [cardFlipped, setCardFlipped] = useState(false);

  return (
    <CardFrame offset={offset}>
      <div
        className={`cardFlipContainer ${
          cardFlipped ? "cardFlipContainerRotate" : ""
        }`}
      >
        <div className="cardFlipFront cardDefault">
          <img className="cardImage" src={playCardImage} alt="" />
        </div>
        <div
          className="cardFlipBack cardDefault"
          onClick={() => setCardFlipped(true)}
        >
          <img className="cardImage" src={backgroundImage} alt="" />
        </div>
      </div>
    </CardFrame>
  );
}

export default memo(CardFlippable);
