import CardFrame from "./CardFrame.component";
import CardImage from "./CardImage.component";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import React from "react";

interface CardPreviewProps {
  card: CardType; // card info
}

/**
 * Component only visible when a card is being dragged, serves as a preview of the movement
 */
function CardPreview({ card }: CardPreviewProps) {
  const styles = {
    display: "inline-block",
    transform: "rotate(-7deg)",
    WebkitTransform: "rotate(-7deg)"
  };

  return (
    // eslint-disable-next-line react/forbid-dom-props
    <div style={styles}>
      <CardFrame zIndex={5}>
        <CardImage directory="CardsFaces" image={card.image} />
      </CardFrame>
    </div>
  );
}

export default CardPreview;
