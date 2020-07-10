import { ExplicitAny } from "../../../global";
import React from "react";

interface ResumeSavedGameModalProps {
  message: string;
  onCancel: ExplicitAny;
  onConfirm: ExplicitAny;
  className?: string;
}

function ResumeSavedGameModal({
  onConfirm,
  onCancel,
  message,
  className = ""
}: ResumeSavedGameModalProps) {
  return (
    <div className={`gameFullDiv ${className}`}>
      <div className="resumeGameQuestion">{message}</div>
      <div
        className={`animatedButton divButton resumeGameAnimatedButton resumeGameQuestion`}
        onClick={onConfirm}
      >
        <span>Yes</span>
      </div>
      <div
        className={`animatedButton divButton resumeGameAnimatedButton resumeGameQuestion`}
        onClick={onCancel}
      >
        <span>No</span>
      </div>
    </div>
  );
}

export default ResumeSavedGameModal;
