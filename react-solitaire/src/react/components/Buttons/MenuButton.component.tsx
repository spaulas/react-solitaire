import React, { PropsWithChildren } from "react";
import { ExplicitAny } from "../../../global";
import { useHistory } from "react-router-dom";

/**
 * Button to start the game, by redirecting to the /game location
 */

interface MenuButtonProps {
  location?: string;
  className?: string;
  params?: ExplicitAny;
  onClick?: ExplicitAny;
}

function MenuButton({
  location,
  className,
  params,
  onClick,
  children
}: PropsWithChildren<MenuButtonProps>) {
  const history = useHistory();
  const handleClick = () => {
    if (location) {
      history.push(location, params);
    } else if (typeof onClick === "function") {
      onClick();
    }
  };
  return (
    <div
      className={`animatedButton divButton ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default MenuButton;
