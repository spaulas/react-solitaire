import { Button, Modal } from "antd";
import React from "react";

interface PausedGameModalProps {
  visible: boolean;
  closeModal: () => void;
}

function PausedGameModal({ visible, closeModal }: PausedGameModalProps) {
  return (
    <Modal
      title="Game Paused"
      centered
      visible={visible}
      footer={<Button onClick={closeModal}>Ok</Button>}
    >
      Paused Game
    </Modal>
  );
}

export default PausedGameModal;
