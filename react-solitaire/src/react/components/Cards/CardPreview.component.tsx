import { CardFrame } from "./Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import React from "react";

const CardPreview = ({ card }: { card: CardType }) => {
  const styles = {
    display: "inline-block",
    transform: "rotate(-7deg)",
    WebkitTransform: "rotate(-7deg)"
  };

  return (
    // eslint-disable-next-line react/forbid-dom-props
    <div style={styles}>
      <CardFrame cardId={card.id} zIndex={5} isFlipped>
        <div className="cardDefault">
          <img
            className="cardImage"
            src={require(`../../../images/CardsFaces/${card.image}`)}
            alt=""
          />
        </div>
      </CardFrame>
    </div>
  );
};

export default CardPreview;
