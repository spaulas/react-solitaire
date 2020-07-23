import React, { PropsWithChildren, ReactNode } from "react";

function BarDisplay({ children }: PropsWithChildren<{}>) {
  if (!children) {
    return null;
  }

  return (
    <div className="joyrideInfoDisplay barDisplayContainer">
      {(children as Array<object>).map((Child: ReactNode, index: number) => (
        <div key={`barDisplay_${index}`} className="barDisplay">
          {Child}
        </div>
      ))}
    </div>
  );
}

export default BarDisplay;
