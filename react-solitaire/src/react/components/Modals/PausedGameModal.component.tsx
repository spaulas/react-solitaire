import { Modal } from "antd";
import { PlaySquareOutlined } from "@ant-design/icons";
import React from "react";

interface PausedGameModalProps {
  visible: boolean;
  closeModal: () => void;
}

// @todo solve problem with classname!
function PausedGameModal({ visible, closeModal }: PausedGameModalProps) {
  return (
    <Modal
      title={
        <div
          // eslint-disable-next-line react/forbid-dom-props
          style={{
            width: "100%",
            textAlign: "center",
            color: "#660000"
          }}
        >
          Game Paused
        </div>
      }
      centered
      visible={visible}
      footer={null}
      closeIcon={[]}
      width="200px"
    >
      <PlaySquareOutlined
        // eslint-disable-next-line react/forbid-component-props
        style={{ fontSize: "150px", color: "#660000" }}
        className="pauseIcon"
        onClick={closeModal}
      />
    </Modal>
  );
}

export default PausedGameModal;
