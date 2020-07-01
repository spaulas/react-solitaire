import React from "react";
import { StarFilled } from "@ant-design/icons";

function HintButton() {
  return (
    // eslint-disable-next-line no-console
    <StarFilled onClick={() => console.log("GIVE HINT!")} />
  );
}

export default HintButton;
