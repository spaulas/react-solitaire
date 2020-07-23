import React, { ReactNode } from "react";
import { ExplicitAny } from "../../../global";
import { FormattedMessage } from "react-intl";

interface ResumeSavedGameModalProps {
  message: ReactNode;
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
        <FormattedMessage id="confirm.yes" />
      </div>
      <div
        className={`animatedButton divButton resumeGameAnimatedButton resumeGameQuestion`}
        onClick={onCancel}
      >
        <FormattedMessage id="confirm.no" />
      </div>
    </div>
  );
}

export default ResumeSavedGameModal;
