import { Button, Modal } from "antd";
import React, { useState } from "react";
import { RootReducerState } from "../../../global";
import { useSelector } from "react-redux";

function GameOverModal() {
  const [visible, setVisible] = useState(true);

  // get gameOver value from redux
  const { gameOver } = useSelector(({ Goal }: RootReducerState) => ({
    gameOver: Goal.gameOver
  }));

  return (
    <Modal
      title="Game Over"
      centered
      visible={gameOver && visible}
      footer={<Button onClick={() => setVisible(false)}>Ok</Button>}
    >
      <p>YOU WON</p>
    </Modal>
  );
}

export default GameOverModal;
