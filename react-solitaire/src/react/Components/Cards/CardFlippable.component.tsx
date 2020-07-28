/* eslint-disable no-console */
import React, { forwardRef, memo, useEffect, useState } from "react";
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
  shake?: boolean;
  increase?: boolean;
  redoAnimation?: boolean;
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
    disabled,
    shake,
    increase,
    redoAnimation
  }: CardFlippableProps,
  ref: ExplicitAny
) {
  const [isMobile, setIsMobile] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [animationStyle, setAnimationStyle] = useState({});
  const animationStyleUndo = {
    transform: `translate(${translationX}px, ${translationY}px) rotateY(180deg)`
  };
  const handleFlip = () => {
    if (!cardFlipped && !disabled) {
      if (translationX && translationX !== 0) {
        setAnimationStyle({
          transform: isMobile
            ? `translate(${-translationX}px, ${translationY}px) rotateY(180deg)`
            : `translate(${translationX}px, ${translationY}px) rotateY(180deg)`
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

  const checkMobile = () => {
    if (!isMobile && window.innerWidth < 767) {
      setIsMobile(true);
    }
    if (isMobile && window.innerWidth >= 767) {
      setIsMobile(false);
    }
  };
  useEffect(checkMobile, []);

  return (
    <CardFrame
      ref={ref}
      cardContainerClassName={className}
      shake={shake}
      increase={increase}
    >
      <div
        className="cardFlipContainer"
        // eslint-disable-next-line react/forbid-dom-props
        style={
          cardFlipped ? animationStyle : redoAnimation ? animationStyleUndo : {}
        }
      >
        <CardImage
          image={image}
          directory="CardsFaces"
          additionalClassName="cardFlipFront"
        />
        <CardImage
          image="flowers.png"
          directory="CardsBackPatterns"
          additionalClassName="cardFlipBack"
          onClick={handleFlip}
        />
      </div>
    </CardFrame>
  );
}

export default memo(forwardRef(CardFlippable));
