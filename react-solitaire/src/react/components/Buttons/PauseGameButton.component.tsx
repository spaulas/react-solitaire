import React, { useState } from "react";
import { Button } from "antd";
import PausedGameModal from "../Modals/PausedGameModal.component";

function PauseGameButton() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button className="optionsButton" onClick={() => setVisible(true)}>
        Pause
      </Button>
      <PausedGameModal visible={visible} closeModal={() => setVisible(false)} />
    </>
  );
}

export default PauseGameButton;
