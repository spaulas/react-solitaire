import React from "react";

interface CardImageProps {
  image?: string;
  directory: string;
  additionalClassName?: string;
  onClick?: () => void;
}

const CardImage = ({
  image = "flowers.png",
  directory,
  additionalClassName = "",
  onClick
}: CardImageProps) => {
  const handleOnClick = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <div
      onClick={handleOnClick}
      className={`cardDefault ${additionalClassName}`}
    >
      <img
        className="cardImage"
        src={require(`../../../images/${directory}/${image}`)}
        alt=""
      />
    </div>
  );
};

export default CardImage;
