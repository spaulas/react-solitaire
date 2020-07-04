import React, { forwardRef, memo, useState } from "react";
import CardFrame from "./CardFrame.component";
import CardImage from "./CardImage.component";
import { ExplicitAny } from "../../../global";

interface CardFlippableProps {
  className?: string; // additional classname for the cardframe
  translationX?: number; // flip with x translation
  translationY?: number; // flip with y translation
  removeCard?: () => void; // function called after the movement
  image: string; // image of the card
  disabled?: boolean; // if disabled, cannot flip
}

/**
 * Component that adds to the card the possibility to flip and/or translate
 */
function CardFlippable(
  {
    className = "",
    translationX = 0,
    translationY = 0,
    removeCard,
    image,
    disabled
  }: CardFlippableProps,
  ref: ExplicitAny
) {
  const [cardFlipped, setCardFlipped] = useState(false);
  const [animationStyle, setAnimationStyle] = useState({});

  const handleFlip = () => {
    if (!cardFlipped && !disabled) {
      if (translationX && translationX !== 0) {
        setAnimationStyle({
          transform: `translate(${translationX}px, ${translationY}px) rotateY(180deg)`
        });
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
    <CardFrame ref={ref} cardContainerClassName={className}>
      <div
        className="cardFlipContainer"
        // eslint-disable-next-line react/forbid-dom-props
        style={cardFlipped ? animationStyle : {}}
      >
        <CardImage
          image={image}
          directory="CardsFaces"
          additionalClassName="cardFlipFront"
        />
        <CardImage
          directory="CardsBackPatterns"
          additionalClassName="cardFlipBack"
          onClick={handleFlip}
        />
      </div>
    </CardFrame>
  );
}

export default memo(forwardRef(CardFlippable));
