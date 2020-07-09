import React, { PropsWithChildren } from "react";
import { useHistory } from "react-router-dom";

/**
 * Button to start the game, by redirecting to the /game location
 */

interface MenuButtonProps {
  location: string;
  className?: string;
}

function MenuButton({
  location,
  className,
  children
}: PropsWithChildren<MenuButtonProps>) {
  const history = useHistory();
  return (
    <div
      className={`animatedButton divButton ${className}`}
      onClick={() => history.push(location)}
    >
      {children}
    </div>
  );
}

export default MenuButton;
