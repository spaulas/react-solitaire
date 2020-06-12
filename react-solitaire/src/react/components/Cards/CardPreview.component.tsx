import CardFrame from "./CardFrame.component";
import CardImage from "./CardImage.component";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import React from "react";

/**
 * Component only visible when a card is being dragged, serves as a preview of the movement
 */
const CardPreview = ({ card }: { card: CardType }) => {
  const styles = {
    display: "inline-block",
    transform: "rotate(-7deg)",
    WebkitTransform: "rotate(-7deg)"
  };

  return (
    // eslint-disable-next-line react/forbid-dom-props
    <div style={styles}>
      <CardFrame zIndex={5} isFlipped>
        <CardImage directory="CardsFaces" image={card.image} />
      </CardFrame>
    </div>
  );
};

export default CardPreview;
