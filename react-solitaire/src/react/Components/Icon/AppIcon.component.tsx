import React from "react";

interface AppIconProps {
  className?: string;
}

function AppIcon({ className = "" }: AppIconProps) {
  return (
    <img
      className={className}
      src={require("../../../images/icon.png")}
      alt=""
    />
  );
}

export default AppIcon;
