import React, { PropsWithChildren } from "react";
import { ExplicitAny } from "../../../global";
import { useHistory } from "react-router-dom";

/**
 * Button to start the game, by redirecting to the /game location
 */

interface MenuButtonProps {
  location: string;
  className?: string;
  params?: ExplicitAny;
}

function MenuButton({
  location,
  className,
  params,
  children
}: PropsWithChildren<MenuButtonProps>) {
  const history = useHistory();
  return (
    <div
      className={`animatedButton divButton ${className}`}
      onClick={() => history.push(location, params)}
    >
      {children}
    </div>
  );
}

export default MenuButton;
