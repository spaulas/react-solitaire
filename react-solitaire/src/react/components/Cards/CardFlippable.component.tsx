/* eslint-disable no-console */
import React, { forwardRef, memo, useState } from "react";
import CardFrame from "./CardFrame.component";
import { RefAny } from "../../../global";
import backgroundImage from "../../../images/CardsBackPatterns/flowers.png";
import playCardImage from "../../../images/CardsFaces/Hearts/hearts12.png";

function CardFlippable(
  {
    translation,
    removeCard
  }: {
    translation?: number;
    removeCard?: () => void;
  },
  ref: RefAny
) {
  const [cardFlipped, setCardFlipped] = useState(false);
  const [animationStyle, setAnimationStyle] = useState({});

  const handleFlip = () => {
    if (!cardFlipped) {
      if (translation && translation !== 0) {
        setAnimationStyle({
          transform: `translate(${translation}px,0) rotateY(180deg)`
        });
        setTimeout(() => {
          setAnimationStyle({ ...animationStyle, display: "none" });
        }, 600);
      } else {
        setAnimationStyle({ transform: "rotateY(180deg)" });
      }
    }

    setCardFlipped(true);
    if (removeCard) {
      removeCard();
    }
  };

  return (
    <CardFrame ref={ref}>
      <div
        className="cardFlipContainer"
        // eslint-disable-next-line react/forbid-dom-props
        style={cardFlipped ? animationStyle : {}}
      >
        <div className="cardFlipFront cardDefault">
          <img className="cardImage" src={playCardImage} alt="" />
        </div>
        <div className="cardFlipBack cardDefault" onClick={handleFlip}>
          <img className="cardImage" src={backgroundImage} alt="" />
        </div>
      </div>
    </CardFrame>
  );
}

export default memo(forwardRef(CardFlippable));
